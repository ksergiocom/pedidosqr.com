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

  <!-- 100% privacy-first analytics -->
  <script data-collect-dnt="true" async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
  <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif?collect-dnt=true" alt=""
      referrerpolicy="no-referrer-when-downgrade" /></noscript>
</body>

</html>