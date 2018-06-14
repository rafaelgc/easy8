<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Easy8</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

        <!-- CodeMirror -->
        <link rel="stylesheet" href="js/codemirror/lib/codemirror.css">
        <script src="js/codemirror/lib/codemirror.js"></script>

    </head>
    <body>
        <div id="app">
            <header>
                Easy8
            </header>
            <nav class="main-menu">
              <router-view name="main-menu"></router-view>
            </nav>

            <div class="working-area">
                <router-view name="working-area"></router-view>
            </div>

        </div>

    </body>
    <script src="{{ asset('js/app.js') }}"></script>
</html>
