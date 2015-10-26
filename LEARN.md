## LEARN

This document is to list the lessons learned and best practices for using React Rails. This will help us evaluate whether this is the right tool or not. This document assumes the user has a basic understanding of React and has at least scanned through the README at [React Rails gem](https://github.com/reactjs/react-rails).

### Javascript Organization
React Rails effectively creates a second javascript manifest file `app/assets/javascripts/components.js` which is required in the standard manifest file. All React components must and any dependencies 'should' be included in `components.js`. (more on this in 'pre-rendering') Aside from having the file name end in `.jsx`, there shouldn't be any restrictions on filenames or directory structure. Make sure the components are available in the global scope, this maybe addressed in future releases of React Rails.

### Data flow
When a component is rendered (from the controller or the erb helper), you can pass `props` directly to the component. This is handled by converting whatever you pass to json and rendering it into a `data-` attribute on the rendered element. This is a pretty standard way of passing data to front end javascript but has some implications.

By default, all attributes of the objects are rendered on the page, so to restrict or enhance what is rendered, we'll want to leverage something like Active Model Serializers, JBuilder or Draper (not sure if this will work). To emphasize, this will only render attributes. so if there is an Active Record relation, it won't be available on the client (like ERB) so we will have explicitly include it when generating the json. This is good and bad, it definitely prevents n+1 queries :).

This also means that when we want to change what is rendered on the page, if we only pass in data via `props` than it requires a page refresh. The solution to this is to use a top level component that manages the data using state` and then passes it down to child components using `props`. This makes updating the data much simpler when we want to use an ajax call. For example, in `QuestionsShow`, instead of passing the answers for a question as `props` I fetch them asynchronously in the initializer of the component, keep them in `state` and pass them down to the children as `props`. Then when I want to update the answers either when the data changes on the server or when the user submits an answer, i can just refresh `state` from the server. Otherwise, I would have to worry about merging objects in `props` and that gets iffy.

### Pre-rendering
The gem provides the ability to pre-render react components on the server, which may provide some performance benefits on initial page loads. Pre-rendering happens when adding the `prerender: true` option to the ERB helper method or when returning a React component directly from the controller.

When a component is pre-rendered, it only performs the first render of the component, that is, it makes it through the `componentWillMount` lifecycle event of the component. This means that any javascript run when initializing the component or in the `componentWillMount` hook (this IS the constructor in es6) must be available on the server at the time of rendering.

Therefore, any 3rd party libraries needed here MUST be included in the `components.js` manifest AND no javascript that requires methods provided by the browser environment can be used. For example, `this.fetchAnswers()` is called in the constructor of `QuestionsShow` which uses the browser-provided `fetch` method. This component cannot be pre-rendered.


### Testing
TBD
