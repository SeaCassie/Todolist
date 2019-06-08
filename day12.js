window.addEventListener('load',function () {
        var Topli=document.querySelectorAll(".top>li");
        var Botli=document.querySelector(".bot")

        var arr=[
            {id:1,content:"涛哥背着我去学习",time:"2019/6/4",status:false},
            {id:2,content:"涛哥背着我去学习",time:"2019/6/8",status:false},
            {id:3,content:"涛哥去买零食",time:"2019/6/15",status:true},
            {id:4,content:"涛哥背着我去学习",time:"2019/5/20",status:false}
        ]
               // let obj= JSON.stringify(arr);
               //  let obj= JSON.parse(localStorage.getItem("todolist"));
               //  if (obj){
               //      arr=obj;
               //  } else{
               //      localStorage.setItem("todolist",JSON.stringify(arr))
               //
               //  }


            let number=0;
            let type="all";
            Topli.forEach(function (elem,index) {
                Topli[index].onclick=function () {

                        Topli[number].classList.remove("hot");
                        this.classList.add("hot");
                        number=index;
                        type=this.getAttribute("type");

                        let newArr=leix(type);
                        // console.log(newArr)
                        todolist(newArr);
                        inputsform();
                }
            })
                Topli[0].onclick();
                inputsform();
//进行input框的选中状态的判断
                function inputsform() {
                    var inputs=document.querySelectorAll("input[type=checkbox]")
                    inputs.forEach(function (elems) {
                        let parentLi=elems.parentNode;
                        let id= parentLi.id;
                        elems.onclick=function () {
                            // console.log("111111")
                            let Arr=arr.filter(elems=>elems.id==id)[0];

                            if (Arr.status){
                                Arr.status=false;
                            }else{
                                Arr.status=true;
                            }

                        }
                    })

                 }

                 function  leix(type){
                     switch (type) {
                         case 'all':var  newArr=arr ;
                             break;
                         case  'done':var  newArr=arr.filter(function (elem) {
                             return elem.status;
                         });
                             break;
                         case 'doing':var newArr=arr.filter(function (elem) {
                             return !elem.status;
                         })
                             break;
                     }
                     return newArr;
                 }

                 // 删除操作
            Botli.onclick=function (e) {
                // console.log(e.target);
                if (e.target.nodeName=="DEL"){
                 let nodeChild=e.target;
                 let nodeParent=nodeChild.parentNode;
                 let id=nodeParent.id;
                 let index1=arr.findIndex(elem=>{return elem.id==id});
                    arr.splice(index1,1);
                    let newArr= leix(type);
                    todolist(newArr);
                }
            }


            // 渲染方法
            function todolist(arr) {
                let html="";
                arr.forEach(function(elem){

                    if (elem.status) {
                         html += `  <li id="${elem.id}"><input  type="checkbox" checked>${elem.content}<del>✖</del> <span>时间:${elem.time}</span></li>`
                    }else{
                         html += `  <li id="${elem.id}"><input type="checkbox" >${elem.content} <del>✖</del><span>时间:${elem.time}</span></li>`
                    }

                });
                Botli.innerHTML= html;

            }
            // 提交
                var submitAdd=document.querySelector("input[type=submit]");
                var addcontent=document.querySelector("input[type=text]");
                var form=document.forms.form1;
                submitAdd.onclick=function (e) {
                    e.preventDefault();
                    let obj= insert();
                    console.log(obj);
                    arr.push(obj);
                    let newArr=leix(type);

                    todolist(newArr);
                    form.reset();

                }
                //insert 插入表单中提交的数据
                function insert() {
                    let id=arr[arr.length-1].id+1;
                    let content=addcontent.value;
                    let status=false;
                    let time=new Date().toLocaleDateString();
                    // console.log(content);
                    // let obj={id,content,time,status};
                    // console.log(obj);
                    return ({id,content,time,status});
                }








})