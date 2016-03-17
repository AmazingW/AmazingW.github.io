---
layout: post
title: 优化之查询语句优化
description: ""
category: 服务端开发
tags: [sql,优化,设计]
keywords: sql,优化,设计
---

mysql的性能优化包罗甚广：
索引优化，查询优化，查询缓存，服务器设置优化，操作系统和硬件优化，应用层面优化（web服务器，缓存）等等。这里的记录的优化技巧更适用于开发人员，都是从网络上收集和自己整理的，主要是查询语句上面的优化，其它层面的优化技巧在此不做记录。

查询的开销指标：

    执行时间
    检查的行数
    返回的行数

建立索引的几个准则：

    1、合理的建立索引能够加速数据读取效率，不合理的建立索引反而会拖慢数据库的响应速度。
    2、索引越多，更新数据的速度越慢。
    3、尽量在采用MyIsam作为引擎的时候使用索引（因为MySQL以BTree存储索引），而不是InnoDB。但MyISAM不支持Transcation。
    4、当你的程序和数据库结构/SQL语句已经优化到无法优化的程度，而程序瓶颈并不能顺利解决，那就是应该考虑使用诸如memcached这样的分布式缓存系统的时候了。
    5、习惯和强迫自己用EXPLAIN来分析你SQL语句的性能。

#### 1. count的优化

    比如：计算id大于5的城市
    a. select count(*) from world.city where id > 5;
    b. select (select count(*) from world.city) – count(*) from world.city where id <= 5;
    a语句当行数超过11行的时候需要扫描的行数比b语句要多， b语句扫描了6行，此种情况下，b语句比a语句更有效率。当没有where语句的时候直接select count(*) from world.city这样会更快，因为mysql总是知道表的行数。

#### 2. 避免使用不兼容的数据类型。

    例如float和int、char和varchar、binary和varbinary是不兼容的。数据类型的不兼容可能使优化器无法执行一些本来可以进行的优化操作。
    在程序中，保证在实现功能的基础上，尽量减少对数据库的访问次数；通过搜索参数，尽量减少对表的访问行数,最小化结果集，从而减轻网络负担；能够分开的操作尽量分开处理，提高每次的响应速度；在数据窗口使用SQL时，尽量把使用的索引放在选择的首列；算法的结构尽量简单；在查询时，不要过多地使用通配符如 SELECT * FROM T1语句，要用到几列就选择几列如：SELECT COL1,COL2 FROM T1；在可能的情况下尽量限制尽量结果集行数如：SELECT TOP 300 COL1,COL2,COL3 FROM T1,因为某些情况下用户是不需要那么多的数据的。不要在应用中使用数据库游标，游标是非常有用的工具，但比使用常规的、面向集的SQL语句需要更大的开销；按照特定顺序提取数据的查找。

#### 3. 索引字段上进行运算会使索引失效。

    尽量避免在WHERE子句中对字段进行函数或表达式操作，这将导致引擎放弃使用索引而进行全表扫描。如：

    SELECT * FROM T1 WHERE F1/2=100 应改为: SELECT * FROM T1 WHERE F1=100*2

#### 4. 避免使用!=或＜＞、IS NULL或IS NOT NULL、IN ，NOT IN等这样的操作符.

    因为这会使系统无法使用索引,而只能直接搜索表中的数据。例如: SELECT id FROM employee WHERE id != “B%” 优化器将无法通过索引来确定将要命中的行数,因此需要搜索该表的所有行。在in语句中能用exists语句代替的就用exists.

#### 5. 尽量使用数字型字段.

    一部分开发人员和数据库管理人员喜欢把包含数值信息的字段
    设计为字符型，这会降低查询和连接的性能，并会增加存储开销。这是因为引擎在处理查询和连接回逐个比较字符串中每一个字符，而对于数字型而言只需要比较一次就够了。

#### 6. 合理使用EXISTS,NOT EXISTS子句。如下所示：

    1.SELECT SUM(T1.C1) FROM T1 WHERE (SELECT COUNT(*)FROM T2 WHERE T2.C2=T1.C2>0)
    2.SELECT SUM(T1.C1) FROM T1WHERE EXISTS(SELECT * FROM T2 WHERE T2.C2=T1.C2)

    两者产生相同的结果，但是后者的效率显然要高于前者。因为后者不会产生大量锁定的表扫描或是索引扫描。如果你想校验表里是否存在某条纪录，不要用count(*)那样效率很低，而且浪费服务器资源。可以用EXISTS代替。如：

    IF (SELECT COUNT(*) FROM table_name WHERE column_name = ‘xxx’)可以写成：IF EXISTS (SELECT * FROM table_name WHERE column_name = ‘xxx’)

#### 7. 能够用BETWEEN的就不要用IN

#### 8. 能够用DISTINCT的就不用GROUP BY

#### 9. 尽量不要用SELECT INTO语句。SELECT INTO 语句会导致表锁定，阻止其他用户访问该表。

#### 10. 必要时强制查询优化器使用某个索引

    SELECT * FROM T1 WHERE nextprocess = 1 AND processid IN (8,32,45) 改成：
    SELECT * FROM T1 (INDEX = IX_ProcessID) WHERE nextprocess = 1 AND processid IN (8,32,45)
    则查询优化器将会强行利用索引IX_ProcessID 执行查询。

#### 11. 消除对大型表行数据的顺序存取

    尽管在所有的检查列上都有索引，但某些形式的WHERE子句强迫优化器使用顺序存取。如：
    SELECT * FROM orders WHERE (customer_num=104 AND order_num>1001) OR order_num=1008
    解决办法可以使用并集来避免顺序存取：
    SELECT * FROM orders WHERE customer_num=104 AND order_num>1001 UNION SELECT * FROM orders WHERE order_num=1008
    这样就能利用索引路径处理查询。【jacking 数据结果集很多，但查询条件限定后结果集不大的情况下，后面的语句快】

#### 12. 尽量避免在索引过的字符数据中，使用非打头字母搜索。这也使得引擎无法利用索引。

    见如下例子：
    SELECT * FROM T1 WHERE NAME LIKE ‘%L%’
    SELECT * FROM T1 WHERE SUBSTING(NAME,2,1)=’L’
    SELECT * FROM T1 WHERE NAME LIKE ‘L%’
    即使NAME字段建有索引，前两个查询依然无法利用索引完成加快操作，引擎不得不对全表所有数据逐条操作来完成任务。而第三个查询能够使用索引来加快操作，不要习惯性的使用 ‘%L%’这种方式(会导致全表扫描)，如果可以使用`L%’相对来说更好;

#### 13. 虽然UPDATE、DELETE语句的写法基本固定，但是还是对UPDATE语句给点建议：

    a) 尽量不要修改主键字段。

    b) 当修改VARCHAR型字段时，尽量使用相同长度内容的值代替。

    c) 尽量最小化对于含有UPDATE触发器的表的UPDATE操作。

    d) 避免UPDATE将要复制到其他数据库的列。

    e) 避免UPDATE建有很多索引的列。

    f) 避免UPDATE在WHERE子句条件中的列。


#### 14. 能用UNION ALL就不要用UNION

    UNION ALL不执行SELECT DISTINCT函数，这样就会减少很多不必要的资源

    在跨多个不同的数据库时使用UNION是一个有趣的优化方法，UNION从两个互不关联的表中返回数据，这就意味着不会出现重复的行，同时也必须对数据进行排序，我们知道排序是非常耗费资源的，特别是对大表的排序。

    UNION ALL可以大大加快速度，如果你已经知道你的数据不会包括重复行，或者你不在乎是否会出现重复的行，在这两种情况下使用UNION ALL更适合。此外，还可以在应用程序逻辑中采用某些方法避免出现重复的行，这样UNION ALL和UNION返回的结果都是一样的，但UNION ALL不会进行排序。

#### 15. 字段数据类型优化：

    a. 避免使用NULL类型：NULL对于大多数数据库都需要特殊处理，MySQL也不例外，它需要更多的代码，更多的检查和特殊的索引逻辑，有些开发人员完全没有意识到，创建表时NULL是默认值，但大多数时候应该使用NOT NULL，或者使用一个特殊的值，如0，-1作为默认值。

    b. 尽可能使用更小的字段，MySQL从磁盘读取数据后是存储到内存中的，然后使用cpu周期和磁盘I/O读取它，这意味着越小的数据类型占用的空间越小，从磁盘读或打包到内存的效率都更好，但也不要太过执着减小数据类型，要是以后应用程序发生什么变化就没有空间了。修改表将需要重构，间接地可能引起代码的改变，这是很头疼的问题，因此需要找到一个平衡点。

    c. 优先使用定长型

#### 16. 关于大数据量limit分布的优化见下面链接（当偏移量特别大时，limit效率会非常低）：

    http://ariyue.iteye.com/blog/553541

    附上一个提高limit效率的简单技巧，在覆盖索引(覆盖索引用通俗的话讲就是在select的时候只用去读取索引而取得数据，无需进行二次select相关表)上进行偏移，而不是对全行数据进行偏移。可以将从覆盖索引上提取出来的数据和全行数据进行联接，然后取得需要的列，会更有效率，看看下面的查询：

    mysql> select film_id, description from sakila.film order by title limit 50, 5;

    如果表非常大，这个查询最好写成下面的样子：

    mysql> select film.film_id, film.description from sakila.film

    inner join(select film_id from sakila.film order by title liimit 50,5) as film usinig(film_id);

#### 17. 程序中如果一次性对同一个表插入多条数据，比如以下语句：

    insert into person(name,age) values(‘xboy’, 14);

    insert into person(name,age) values(‘xgirl’, 15);

    insert into person(name,age) values(‘nia’, 19);

    把它拼成一条语句执行效率会更高.

    insert into person(name,age) values(‘xboy’, 14), (‘xgirl’, 15),(‘nia’, 19);

#### 18. 不要在选择的栏位上放置索引，这是无意义的。应该在条件选择的语句上合理的放置索引，比如where，order by。

    SELECT id,title,content,cat_id FROM article WHERE cat_id = 1;

上面这个语句，你在id/title/content上放置索引是毫无意义的，对这个语句没有任何优化作用。但是如果你在外键cat_id上放置一个索引，那作用就相当大了。

#### 19. ORDER BY语句的MySQL优化：

    a. ORDER BY + LIMIT组合的索引优化。如果一个SQL语句形如：

    SELECT [column1],[column2],…. FROM [TABLE] ORDER BY [sort] LIMIT [offset],[LIMIT];

    这个SQL语句优化比较简单，在[sort]这个栏位上建立索引即可。

    b. WHERE + ORDER BY + LIMIT组合的索引优化，形如：

    SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] = [VALUE] ORDER BY [sort] LIMIT [offset],[LIMIT];

    这个语句，如果你仍然采用第一个例子中建立索引的方法，虽然可以用到索引，但是效率不高。更高效的方法是建立一个联合索引(columnX,sort)

    c. WHERE + IN + ORDER BY + LIMIT组合的索引优化，形如：

    SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] IN ([value1],[value2],…) ORDER BY [sort] LIMIT [offset],[LIMIT];

    这个语句如果你采用第二个例子中建立索引的方法，会得不到预期的效果（仅在[sort]上是using index，WHERE那里是using where;using filesort），理由是这里对应columnX的值对应多个。
    目前哥还木有找到比较优秀的办法，等待高手指教。

    d.WHERE+ORDER BY多个栏位+LIMIT，比如:

    SELECT * FROM [table] WHERE uid=1 ORDER x,y LIMIT 0,10;

    对于这个语句，大家可能是加一个这样的索引:(x,y,uid)。但实际上更好的效果是(uid,x,y)。这是由MySQL处理排序的机制造成的。

#### 20. 其它技巧：

    http://www.cnblogs.com/nokiaguy/archive/2008/05/24/1206469.html
    http://www.cnblogs.com/suchshow/archive/2011/12/15/2289182.html
    http://www.cnblogs.com/cy163/archive/2009/05/28/1491473.html
    http://www.cnblogs.com/younggun/articles/1719943.html
    http://wenku.baidu.com/view/f57c7041be1e650e52ea9985.html

最后，你可以使用explain关键字去判断和评测一个sql语句是否还有优化的可能性，关于它的详细使用请参考mysql手册。