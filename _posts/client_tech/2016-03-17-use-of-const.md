---
layout: post
title: C++ const 修饰方法注意事项
description: ""
category: 客户端开发
tags: [c++,const]
keywords: c++,const
---


const，c/c++中非常常用的关键字。

首先我们看看const有那些修饰方法。

最前面我们来看一个问题。

char *p = "123";

可能有的人不知道，这里的这个"123"是存储在常量区的，不容许修改的。

也就是说它是个const类型的。

标准的写法应该是

char const *p = "123";


至于为什么编译器容许上面的那个不标准的写法，可能是因为兼容性的问题吧。

char p[4] = "123";//这个和上面的开始大不一样的啊。

切入正题。

设定：

const int s = 0;

上面的很容易理解。但带上指针有些同学可能就要昏了。

```c
const int *p = &s;//（1）
int const *p = &s;//（2）
int * const p = &s;//（3）
const int * const p = &s;//（4）
```

（1）和（2）的效果是一样的，意思是 p 是可变的，但是 p 指向的值是不可变的。

（3）就刚好相反，p 是不可变的，只能指向一个地方，但是 p 指向的值是可变的。

（4）p不可变，*p 也不可变。

我们举个例子看看。

```c
int s = 0;
const int *p = &s;
p++;//可以
p--;//可以
*p = 4;//错误
``

----

```c
int s = 0;
int * const p = &s;
*p = 4;//可以
p++;//错误
```

----

有的时候我们会使用typedef。

```c
typedef char * pStr;
char str[4] = "123";
const char *p1 = str;// p1可变，*p1不可变
const pStr p2 = str;// 和上面的意思不一样哦，p2不可变，*p2可变 //因为本身为char*
p1++;//可以
p2++;//错误
```
----

有时候我们会使用括号

```c
(int *) const p;//p是不可变,*p可变
const (char *) p;//p是可变,*p不可变
```

----


在c中 被const修饰的变量并不是正真意义上的常量，而是只读的变量，这和常量还有不少的差距的。

也就是说在内存中开辟一个只读的空间存贮这个变量，如何保证这个空间只读是通过编译器实现的，

当我们能骗过编译器的时候，我们就能就能修改const常量。

在c代码中写：

```c
const int num = 9;
int ary[num];
```

这段代码是不能通过编译的，如果真的想这么干只能通过宏来实现了。

```c
#define NUM = 9;
int ary[NUM];
```


大家都知道宏替换的一些弊端，比如：NUM没有类型，从此NUM这个名字再也没有别的用途。
-------------------------------------------------------------

而c++中的const就先进的多了。他是在编译的时候就已经确定了的值。

```c
const int num = 9;
int ary[num];
```

同样的代码在C++中就一点问题都没有了。

而且我们还可以通过强制转换去掉其const属性。

```c
const int a = 4;
const int *p = &a;
int *q;
q = const_cast<int *>( p );
```

但是我们要明白的是c++中使用const_cast的目的不是要我们去修改一个const量（虽然我们可以用各种方法做到），

而是让我们可以用一个 指向非const的指针（或引用） 去 指向一个const的变量，通常在函数调用时使用。

下面我们也尝试一下修改const量。

很简单：

```c
const int a = 4;
const int *p = &a;
int *q;
q = const_cast<int *>( p );
std::cout << a << std::endl;
*q = 9;
std::cout << a<< std::endl;
```


OK了。

有的同学试验了，可能出问题了。

a打印出来都是4啊，没变啊。

其实是变了。

如果我们打印 *p，*q 发现其值是9。

我们打印p,q,&a地址也是一样的。

这就更奇怪了，同一个地址怎么可能有2个值。

我来告诉大家为什么

我们的编译器是很强大的，他会对代码进行一些优化，

当我们定义变量a之后，再使用a的时候，没有从a的地址去取值，而是直接使用了4 。

所以打印的还是4。

有人会觉得我在耍他，不信我们使用下面的代码

```c
const volatile int a = 4;//尽管非常奇怪，你const了还易变。。
const volatile int *p = &a;
int *q;
q = const_cast<int *>( p );
std::cout << a << std::endl;
*q = 9;
std::cout << a<< std::endl;
```

此时下面打印的就是9了。

所以啊，我们不要随便去改const量，常常会有一些出乎我们意料的结果。

既然定义了const心里就想着他是常量了。

----

const还可以用来修饰方法，不过const就不是像static那样放在函数的前面了，

因为放在前面的const已经有意义了，是指函数的返回值是const的。这样只能放在函数的最后了。

例如：

```c
int get( ) const;
```


有什么作用呢。他的意思就是这个方法不能修改类成员变量的值。

例如

```c
class human
{
private:
    int m_gender;
    int m_age;
public:
    human():m_gender(0),m_age(0)
    {
    }
    int getAge1( ) const
    {
        m_age = 20;//错误，试图在const方法中修改类成员变量
         m_gender = 1;//错误，试图在const方法中修改类成员变量
         return m_age;
    }
    int getAge2( )
    {
        m_gender = 1;//正确
         m_age = 20;//正确
         return m_age;
    }
};
```

如果我们定义一个const的human对象。那么我们使用这个const的对象的方法时只能使用被const修饰的

方法。

```c
const human a;
a.getAge1();//正确
a.getAge2();//错误
```


有的同学有疑问了，如果类中有的值是需要在const时改变的怎么办。

C++此时又引入了一个很好的关键字mutable

```c
class human
{
private:
    int m_gender;
    mutable int m_age;
public:
    human():m_gender(0),m_age(0)
    {
    }
    int getAge1( ) const
    {
        m_age = 20;//正确。使用了mutable关键字
         m_gender = 1;//错误，试图在const方法中修改类成员变量
         return _age;
    }
    int getAge2( )
    {
        m_gender = 1;//正确
         m_age = 20;//正确
         return m_age;
    }
};
```


下面谈一下一点的其他问题：

见过别人写这样的代码：


```c
class string
{
private:
    char *m_pStr;
public:
    string( const char *pstr = NULL )
    {
        m_pStr = new char[20];
        memset( m_pStr, 0, 20 );
        strcpy( m_pStr, pstr, 19 );
    }
    char *getName()
    {
        return m_pStr;
    }
    ~string()
    {
        delete[] m_pStr;
    }
};
```

这样的代码看似没有问题，也可以正常运行，但是存在巨大的隐患，会给不法分子可乘之机。
char *getName()这个方法。这个方法将我们的private变量暴露给了别人。
我们就可以通过调用这个接口获得这个地址修改其中的值。

```c
int main( void )
{
    string str("cc");
    char *p;

    p = str.getName();
    std::cout << p << std::endl;
    p[0] = '4';
    std::cout << p << std::endl;

    return 0;
}
```

我们可以将其改写为

```c
const char *getName() const
```

这样

```c
int main( void )
{
    string str("cc");
    const char *p;

    p = str.getName();
    p[0] = '4'; //报错
    std::cout << p << std::endl;

    return 0;
}
```

不过我们最好改写为

```c
int getName( char *str ) const//使用时确保str空间是够的。
{
 strcpy( str, m_pStr );
}
```
