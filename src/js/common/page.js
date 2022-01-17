import {gsap} from "gsap";

export default class page{
    constructor() {
        this.documentHeight = document.body.clientHeight;
        this.windowHeight = window.innerHeight;
        this.body = document.querySelector('body');
        this.mainPage = document.querySelector('.main-wrap');
        this.subPage = document.querySelector('.work-page');
        this.init();
    }

    init() {
        window.addEventListener('scroll',()=>{this.onScrollHandler();});
        this.setIeError();
        this.setMenuToggle();
        this.setCursor();
        this.setIndicator();
        this.setTxtGsapMotion();
        this.setPageTransMotion();
    }

    setIeError(){
        const agent = navigator.userAgent.toLowerCase();
        if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
            document.querySelector('body').style.display = 'none';
            alert('IE는 지원하지 않습니다'); 
        }
    }

    onScrollHandler(){
        let scrollValue = window.pageYOffset;
        this.setIntroTxtMotion(scrollValue);
        this.setViewTrans(scrollValue);
        this.setBgTrans(scrollValue);
    }

    setViewTrans(y){
        const workEl = document.querySelectorAll('.work > div');
        const subImgEl = document.querySelectorAll('.motion');
        let windowH = window.innerHeight;
        if(this.mainPage){
            workEl.forEach((el) => {
                if(y >=  el.offsetTop + windowH/ 1.8) {
                    el.classList.add('view');
                }
            });
        }
        else{
            subImgEl.forEach((el) => {
                if(y >=  el.offsetTop  - windowH / 1.8) {
                    el.classList.add('active');
                }
            });
        }
    }

    setBgTrans(y){
        const transBg = document.querySelector('.trans-bg');
        if( y >=  this.documentHeight - this.windowHeight - 5){
            transBg.classList.add('up');
        }
        else {
            transBg.classList.remove('up');
        }
    }

    setIntroTxtMotion(y){
        if(this.mainPage){
            const introTxt = document.querySelectorAll('.text-box, .bot-text');
            const scrollWrap = document.querySelector('.scroll-wrap');
            const work = document.querySelector('.work');
            introTxt.forEach((el) => {            
                el.setAttribute('style','transform:translate3d(0, '+(-y/500)+'%,0) skew(0deg, '+(y/100)+'deg); opacity:'+(1-y/550)+';');
            });
            scrollWrap.setAttribute('style','opacity:'+(1-y/550)+';');
            if(y >= work.offsetTop) {     
                document.querySelector('.text-box').setAttribute('style','transform:translate3d(0px, -2%, 0px) skew(0deg, 6deg); opacity:0;');
            }
        }
        else{
            document.querySelector('.head-img h2').style.transform = 'translate3d(0, '+y/35+'vh,0)';
        }
    }

    setTxtGsapMotion(){
        if(this.mainPage){
            const tl =  gsap.timeline();
            tl.staggerTo('header h1, header .work-btn',1.4,{opacity:1, x:0,ease:'power2.out'},0.2)
                .to('.intro .trans-text',0.7,{x:0,y:0,ease:'power2.out'},"-=1")
                .staggerTo('.head-text h2, .bot-text p',1.3,{opacity:1,y:0,rotation:0,ease:'power2.out'},0.2,"-=0.7")
                .to('.scroll-wrap span',1.3,{width:'100%',ease:'power2.out'},"-=0.7")
                .to('.scroll-wrap svg',0.8,{opacity:1},"-=0.5");
        }
        else{
            const t2 = gsap.timeline();
            t2.to('.head-img img, .back a',0.8,{opacity:1,delay: 1})
            .to('.head-img h2',1,{opacity:1,y:0,rotation:0,ease:'power2.out'},"-=0.5");
        }
    }

    setMenuToggle(){
        const nav = document.querySelector('.work-list');
        const navList = document.querySelectorAll('.list-con > div');
        const openBtn = document.querySelector('.work-btn');
        const closeBtn = document.querySelector('.close');
        if(!nav) return;
        openBtn.addEventListener('click',()=>{
            if(!nav.classList.contains('active')){
                this.body.style.overflow  = 'hidden';
                nav.classList.add('active');
                closeBtn.style.pointerEvents = 'none';
                navList.forEach(function(el, index){
                    el.style.transition = 'transform 1.5s '+'0.'+index+'s ease-in-out';
                });
                setTimeout(function() {
                    closeBtn.style.pointerEvents = '';
                }, 1500);
            }
        });
        closeBtn.addEventListener('click',()=>{
            this.body.style.overflow  = '';
            nav.classList.remove('active');
            openBtn.style.pointerEvents = 'none';
            nav.style.transition = '0.5s 2s';
            setTimeout(function() {
                openBtn.style.pointerEvents = '';
                nav.style.transition = '';
            }, 2300);
        });
    }

    setPageTransMotion(){
        if(this.subPage){
            document.querySelector('body').insertAdjacentHTML('beforeEnd', "<div class='page-loader'><div class='pl1'></div><div class='pl2'></div><div class='pl3'></div></div>");
            document.querySelector('.page-loader').classList.add('visible');
            setTimeout(function() {
                document.querySelector('.page-loader').remove();
            }, 1800);
        }
    }

    setCursor(){
        if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
            this.body.insertAdjacentHTML('afterBegin', "<div class='cursor'></div>");
            window.addEventListener('mousemove',function(e){
                const cursor = document.querySelector('.cursor');
                cursor.style.left = e.pageX-15 + "px";
                cursor.style.top = e.pageY-15 + "px";
            });
        }
    }

    setIndicator(){
        const indicator = document.querySelector('.indicator');
        function debounce(func, wait, immediate) {
            let timeout;
            return function() {
                let context = this,
                args = arguments;
                const later = function() {
                timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        window.addEventListener('scroll',function(){
            const moveIndicator = debounce(function() {
                let viewportHeight = window.innerHeight;
                let documentHeight = document.body.clientHeight;
                let scrollVal = window.pageYOffset;
                let percent = (scrollVal / (documentHeight - viewportHeight)) * 100;
                    indicator.style.top = percent + '%';
            }, 5);
            moveIndicator();
        });
    }
}