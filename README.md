You can follow the steps below or if you have access, visit: [Tenon Workshop](https://tenonworkshop.service-now.com/x/cadso/shell/home/1707268321586) and look at the console's errors

1. Navigate to the folder "HelloWorldSN"

1. Run `npm i`

1. Run `npm run dev`

1. Notice the component loads the "Hello World, \<text\>" message

1. Run `npm run deploy` to your instance

1. Drag and drop componet onto the page

1. Open the page

1. Notice the component does not load the "Hello World, \<text\>" message

   - Note: Even if the child component is deployed to the instance it still does not load
   - Note: Open the console to see the error "Failed to load: $tenonhq-hello-world-npm/index at /uxasset/externals/$tenonhq-hello-world-npm/index.jsdb"
