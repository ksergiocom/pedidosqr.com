<!DOCTYPE html>
<html class="h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @viteReactRefresh
    @vite('resources/js/app.js')
    @inertiaHead
  </head>

  <body class="h-full">
    @routes
    @inertia
  </body>
</html>