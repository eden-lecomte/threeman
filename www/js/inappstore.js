function initializeStore() {

    console.log("starting store load");
    console.log(store);

    // Let's set a pretty high verbosity level, so that we see a lot of stuff
    // in the console (reassuring us that something is happening).
    store.verbosity = store.INFO;
    console.log('Store verbosity');

    // We register a dummy product. It's ok, it shouldn't
    // prevent the store "ready" event from firing.
    store.register({
        id:    "com.drinks.threeman.pro",
        alias: "Pro Edition",
        type:  store.NON_CONSUMABLE
    });

    console.log('Check store: ' + store);
    console.log(store);
    console.log('Finished trying to log store');

    // When every goes as expected, it's time to celebrate!
    // The "ready" event should be welcomed with music and fireworks,
    // go ask your boss about it! (just in case)
    store.ready(function() {
        console.log("\\o/ STORE READY \\o/");
    });

    store.when("com.drinks.threeman.pro").approved(function(product) {
        // download the feature
            console.log('Pro edition approved');
            $('.purchase').addClass("premium");
            $('.free').addClass("premium");
            $('.free').removeClass('free');
            $('#logo img.pro').fadeIn(200);

            for (i = 0; i < switchery.length; i++) {
                switchery[i].enable();
            };
            location.hash = '#menu';
            proEdition = true;
            product.finish();
    });

    store.when("com.drinks.threeman.pro").updated( function() {
        var product = store.get('com.drinks.threeman.pro');
        //store.when("com.drinks.threeman.pro").updated(renderStore);

        renderStore();        
    });

    // After we've done our setup, we tell the store to do
    // it's first refresh. Nothing will happen if we do not call store.refresh()
    store.refresh();

};



function renderStore() {

    console.log("Rendering store");

    //Get our unlock product
    var product = store.get('com.drinks.threeman.pro');

    //List the price in-app
    $('.purchase').text('Unlock Pro ' + product.price);
    $('#purchase').on('click', function() {
        store.order('com.drinks.threeman.pro');
    });

    if (!product) {
        $('.purchase').html("Unable to connect");
    }
    else if (product.state === store.REGISTERED) {
        $('.purchase').html("<div class=\"loading\" />");
    }
    else if (product.state === store.INVALID) {
        $('.purchase').html("Unable to connect");
    }
    else {
        // Good! Product loaded and valid.

        // Is this product owned? Give him a special class.
        if (product.owned) {
            $('.purchase').addClass("premium");
            $('.free').addClass("premium");
            $('.free').removeClass('free');
            $('#logo img.pro').fadeIn(200);

            for (i = 0; i < switchery.length; i++) {
                switchery[i].enable();
            }  
            proEdition = true;
        }
        else {
            $('#menu').addClass('free');
            $('.purchase').removeClass("premium");
            $('.free').removeClass('premium');
            $('.upgrade-link').fadeIn();
            for (i = 0; i < switchery.length; i++) {
                switchery[i].disable();
            }         
            $('#purchase').text('Unlock Pro ' + product.price);               
        }

        // Is an order for this product in progress? Can't be ordered right now?
        if (product.canPurchase) {
            $('.purchase').addClass("can-purchase");
        } 
        else {
            $('.purchase').removeClass("can-purchase");
        }
    }
}    