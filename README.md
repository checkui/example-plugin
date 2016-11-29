# Plugin development guide

[![CircleCI](https://circleci.com/gh/checkui/plugin-guide.svg?style=svg)](https://circleci.com/gh/checkui/plugin-guide)

This guide runs the [Title length](https://github.com/checkui/plugin-title-length) plugin as an example.

---

### Vendor webhook receives

The `snapshots` object may be populated with one or two snapshots. So we can use the service as a utility for analysis and comparison. When two snapshots are sent, then two `analysis` and one `compare` is being requested. CheckUI will manage snapshot storage, request assembly, etc. A plugin simply needs to handle the analysis and comparison. Snapshot IDs are simplfied to `a` and `b`. `a` is the baseline, and `b` is the change.

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
