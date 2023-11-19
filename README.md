[![Netlify Status](https://api.netlify.com/api/v1/badges/4abdf3ad-280d-4be4-a89a-c669f97d395f/deploy-status?branch=deploy)](https://app.netlify.com/sites/tangerine-panda-5ff950/deploys)

# Sprint 2 Info
- switched from serving static content built with vite and handlebars
  to observer/event-bus method to dynamically add and update components
- instead of multiple pages, only one is used to manage displayed content
- implemented forms validation and input collection based on a Form component
- switched to typescript
- added linters eslint and stylelint with standard configs and prettier formatter
- added a constructor for network requests

[![output.gif](https://i.postimg.cc/xdRzL8YZ/output.gif)](https://postimg.cc/LqJ5pHJk)


# Project Messenger "Sweater"

The idea is that each user is a filament.

Filaments interweave to threads.

And threads form Sweater.

Also Sweater contains 'sweat' to refer to hot debate.

_Sweater is a messenger that will make you sweat._

## Commands

- `npm run dev` - start **vite** dev server
- `npm run build` - to run types check and to build source to **dist** directory
- `npm run server` - to start local **express** server that serve **dist** directory
- `npm run start` - rebuild the source and start **express** server
- `npm run prebuild` - check types with tsc
- `npm run eslint` - lint js and ts with eslint and standard-js-with-typescript
- `npm run stylelint` - lint styles with stylelint standard-scss
- `npm run prettier` - check code style with prettier

## Pages (links to netlify)

- Index with links to all pages [link](https://tangerine-panda-5ff950.netlify.app/)
- Authorization [link](https://tangerine-panda-5ff950.netlify.app/pages/authorization/)
- Registration [link](https://tangerine-panda-5ff950.netlify.app/pages/registration/)
- List of threads [link](https://tangerine-panda-5ff950.netlify.app/pages/threadList/)
- Active thread [link](https://tangerine-panda-5ff950.netlify.app/pages/threadActive/)
- Manage thread [link](https://tangerine-panda-5ff950.netlify.app/pages/threadManage/)
- User profile [link](https://tangerine-panda-5ff950.netlify.app/pages/profile/)
- Change password [link](https://tangerine-panda-5ff950.netlify.app/pages/passwordchange/)
- 404 [link](https://tangerine-panda-5ff950.netlify.app/pages/404/)
- 5xx [link](https://tangerine-panda-5ff950.netlify.app/pages/5xx/)

## Prototype

[Figma link](https://www.figma.com/file/Qg7ZcgVIdRBW2Vo03Nf5J1/Untitled?type=design&node-id=0%3A1&mode=design&t=PMcwbCtKFhTk3CQB-1)
