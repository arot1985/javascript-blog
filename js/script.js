
{
    const opts = {
     articleSelector : '.post',
     titleSelector : '.post-title',
     titleListSelector : '.titles',
     articleTagsSelector : '.post-tags .list',
     articleAuthorsSelector : '.post-author',
     tagsListSelector : '.tags.list',
     cloudClassCount : 5,
     cloudClassPrefix : 'tag-size-',
     authorsListSelector : '.list.authors',
    };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  }

  

    function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(opts.titleListSelector);

    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);

    let html = '';

    for(let article of articles){

      /* get the article id */
      /* find the title element */
      const articleId = article.getAttribute("id");
      console.log(articleId);

      /* get the title from the title element */
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */

      //titleList.insertAdjacentHTML('beforebegin', linkHTML)
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
}

  generateTitleLinks();

  function calculateTagsParams (tags){
    const params = {
      max: 0,
      min: 999999,
    }

    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      } 
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }

    return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
    return opts.cloudClassPrefix + classNumber;
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
 let allTags = {};

   /* find all articles */
   const articles = document.querySelectorAll(opts.articleSelector);

   /* START LOOP: for every article: */
   for(let article of articles){

     /* find tags wrapper */
     const tagsList = article.querySelector(opts.articleTagsSelector);
     console.log(tagsList);

     /* make html variable with empty string */
     let html = '';

     /* get tags from data-tags attribute */
     const articleTags = article.getAttribute('data-tags');
     console.log(articleTags);

     /* split tags into array */
     const articleTagsArray = articleTags.split(' ');
     console.log(articleTagsArray);

     /* START LOOP: for each tag */
     for (let tag of articleTagsArray) {

       /* generate HTML of the link */
       const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
       console.log(tagLinkHTML);

       /* add generated code to html variable */
       html = html + ' ' + tagLinkHTML;

       /* [NEW] check if this link is NOT already in allTags */
       if(!allTags[tag]) {
       /* [NEW] add tag to allTags object */
       allTags[tag] = 1;
       } else {
       allTags[tag]++;
     }

     /* END LOOP: for each tag */
     }

     /* insert HTML of all the links into the tags wrapper */
     tagsList.innerHTML = html;

   /* END LOOP: for every article: */
   }
   /* [NEW] find list of tags in right column */
   const tagList = document.querySelector('.tags');

   /* [NEW] create variable for all links HTML code */
   const tagsParams = calculateTagsParams(allTags);
   console.log('tagsParams:', tagsParams)
   let allTagsHTML = '';

   /* [NEW] START LOOP: for each tag in allTags: */
     for(let tag in allTags){

     /* [NEW] generate code of a link and add it to allTagsHTML */
     const tagLinkHTML ='<li><a href="#tag-' + tag + '" class= "' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
     console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;
    console.log(allTagsHTML);
   
     /* [NEW] END LOOP: for each tag in allTags: */
     }
 
   /*[NEW] add HTML from allTagsHTML to tagList */
   tagList.innerHTML = allTagsHTML;
 }

 generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);

    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){


      /* remove class active */
      activeTagLink.classList.remove('active');
    
    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinksHref)

    /* START LOOP: for each found tag link */
    for(let tagLinkHref of tagLinksHref){

      /* add class active */
      tagLinkHref.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('.tags a, .post-tags a');
    console.log(allLinksToTags);

    /* START LOOP: for each link */
    for(let allLinkToTags of allLinksToTags){
      /* add tagClickHandler as event listener for that link */
      allLinkToTags.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function calculateAuthorsParams (authors){
    const params = {
      max: 0,
      min: 999999,
    }

    for(let author in authors){
      if(authors[author] > params.max){
        params.max = authors[author];
      } 
      if(authors[author] < params.min) {
        params.min = authors[author];
      }
      console.log(author + ' is used ' + authors[author] + ' times');
    }

    return params;
  }


function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const authorsList = article.querySelector(opts.articleAuthorsSelector);
    console.log(authorsList);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-authors attribute */
    const articleAuthors = article.getAttribute('data-authors');
    console.log(articleAuthors);
    

    /* split authors into array */
    //const articleAuthorsArray = articleAuthors.split(' ');
    //console.log(articleAuthorsArray);

    /* generate HTML of the link */
      const authorLinkHTML = '<li><a href="#' + articleAuthors + '">' + articleAuthors + '</a></li>';
      console.log(authorLinkHTML);

    /* add generated code to html variable */
      html = html + authorLinkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[articleAuthors]) {
    /* [NEW] add tag to allTags object */
      allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }

      /* insert HTML of all the links into the tags wrapper */
     authorsList.innerHTML = html;

    /* END LOOP: for every article: */
    }
  
   /* [NEW] find list of authors in right column */
   const authorList = document.querySelector(opts.authorsListSelector);

   /* [NEW] create variable for all links HTML code */
   const authorsParams = calculateAuthorsParams(allAuthors);
  
   let allAuthorsHTML = '';

   /* [NEW] START LOOP: for each articleAuthors in allAuthors: */
     for(let articleAuthors in allAuthors){

     /* [NEW] generate code of a link and add it to allAuthorsHTML */
     const authorLinkHTML ='<li><a href="#' + articleAuthors + '">' + articleAuthors + '</a> (' + allAuthors[articleAuthors] + ')</li>';
     console.log('authorLinkHTML:', authorLinkHTML);

    allAuthorsHTML += authorLinkHTML;
    console.log(allAuthorsHTML);
   
     /* [NEW] END LOOP: for each articleAuthors in allAuthors: */
     }
 
   /*[NEW] add HTML from authorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
 }

generateAuthors();

function authorsClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "authorsHref" and read the attribute "href" of the clicked element */
  const authorsHref = clickedElement.getAttribute("href");
  console.log(authorsHref);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = authorsHref.replace('#', '');
  console.log(author);

  /* find all authors links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#"]');
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){


    /* remove class active */
    activeAuthorLink.classList.remove('active');
  
  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + authorsHref + '"]');
  console.log(authorLinksHref)

  /* START LOOP: for each found author link */
  for(let authorLinkHref of authorLinksHref){

    /* add class active */
    authorLinkHref.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors~="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('.authors a, .post-author a');
  console.log(allLinksToAuthors);
  /* START LOOP: for each link */
  for(let allLinkToAuthors of allLinksToAuthors){

    /* add tagClickHandler as event listener for that link */
    allLinkToAuthors.addEventListener('click', authorsClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
}