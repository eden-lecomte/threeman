function initializeStore() {

    // Let's set a pretty high verbosity level, so that we see a lot of stuff
    // in the console (reassuring us that something is happening).
    store.verbosity = store.INFO;

    // We register a dummy product. It's ok, it shouldn't
    // prevent the store "ready" event from firing.
    store.register({
        id:    "com.drinks.threeman.pro",
        alias: "Pro Edition",
        type:  store.NON_CONSUMABLE
    });

    // When every goes as expected, it's time to celebrate!
    // The "ready" event should be welcomed with music and fireworks,
    // go ask your boss about it! (just in case)
    store.ready(function() {
        console.log("\\o/ STORE READY \\o/");
    });

    // After we've done our setup, we tell the store to do
    // it's first refresh. Nothing will happen if we do not call store.refresh()
    store.refresh();
}

store.when("com.drinks.threeman.pro").updated( function() {
    var product = store.get('com.drinks.threeman.pro');

    $('#purchase').text('Unlock Pro ' + product.price);

});