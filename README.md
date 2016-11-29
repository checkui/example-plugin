# Plugin guide

[![CircleCI](https://circleci.com/gh/checkui/plugin-guide.svg?style=svg)](https://circleci.com/gh/checkui/plugin-guide)

How to develop a plugin for the CheckUI app store.

This guide will run any plugin. It currently runs the [Title length](https://github.com/checkui/plugin-title-length) plugin.

---

### Vendor webhook receives

The `snapshots` object may be populated with one or two snapshots. This allows CheckUI to use this service as a utility for analysis and comparison. If two snapshots are sent, then two analysis requests and a compare request is being sent. CheckUI will manage snapshot storage, request assembly, etc. the plugin simply needs to handle analysis and comparison. The snapshot IDs are simplfied to `a` and `b` so comparison statements can be easily made.

```js
{
  postback: <uri>,
  snapshots: {
    a: {
      endpoint: <uri>,
    },
    b: {
      endpoint: <uri>,
    }
  },
}
```

### Postback webhook receives

Plugins have 60 minutes to post results. Ideally the result is posted as soon as possible.
