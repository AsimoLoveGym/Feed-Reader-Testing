/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('URLs are defined and not empty for all allFeeds element', function() {
             for(var i = 0; i < allFeeds.length; i ++){
               expect(allFeeds[i].url).toBeDefined();
              //  REMEMBER: Null is a specific value
              //  expect(allFeeds[i].url).not.toBe(null);
               expect(allFeeds[i].url).not.toBe('');
             }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names are defined and not empty for all allFeeds element', function() {
             for(var i = 0; i < allFeeds.length; i ++){
               expect(allFeeds[i].name).toBeDefined();
              //  expect(allFeeds[i].name).not.toBe(null);
               expect(allFeeds[i].name).not.toBe('');
             }
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('should be hidden by default', function() {
             var x = document.getElementsByTagName("body")[0];
             console.log(x.className);

             expect(x.className.indexOf('menu-hidden') > -1).toBe(true);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('visibility should be switched by menu icon clicked', function() {
              var x = document.getElementsByTagName("body")[0];
              var menuIcon = $('.menu-icon-link');
              menuIcon.click();
              expect(x.className.indexOf('menu-hidden') > -1).toBe(false);
              menuIcon.click();
              expect(x.className.indexOf('menu-hidden') > -1).toBe(true);
          });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
          //  cb parameter should be done
              loadFeed(0, done);
         });

        //  it('should be at least one .entry element with .feed container', function(done) {
        // From project review suggestion, since ASYNC is not called here,
        // no necessary in the below spec
        it('should be at least one .entry element with .feed container', function() {
             var entryElements = $(".feed .entry");
            //  console.log(entryElements);
             expect(entryElements.length > 0).toBe(true);
            //  done();
         });
    });

    /* A new test suite named "New Feed Selection" */
    describe('Initial Entries', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var beforeFeed;

         beforeEach(function(done){
          //  cb parameter should be done
              loadFeed(0, function(){
                beforeFeed = $('.feed').html();
                // console.log(beforeFeed);
                done();
              });
         });

         it('new content should be loaded by loadFeed()', function(done) {
             loadFeed(1, function(){
               expect($('.feed').html()).not.toEqual(beforeFeed);
              //  console.log($('.feed').html());
               done();
             });
         });
    });
}());
