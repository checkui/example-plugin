# Plugin example

How to develop a plugin for the CheckUI app store.

This plugin will check a given website’s description meta tag and determine its character length.

---

### Vendor webhook receives

The `snapshots` object may be populated with one or two snapshots keyed by their ID. This allows CheckUI to use this service as a utility for analysis and comparison. If two snapshots are sent, then two analysis requests and a compare request is being sent. CheckUI will manage snapshot storage, request assembly, etc. the plugin simply needs to handle analysis and comparison. The snapshot IDs are simplfied to `a` and `b` so comparison statements can be easily made.

```js
{
  meta: {
    ...request
    endpoint: 'http://www.apple.com/',
  },
  postback: 'https://api.checkui.com/plugin/postback/mSWDbfxpSD...',
  snapshots: {
    a: {
      ...snapshot
      page: {
        ...page
        meta: {
          ...meta
          description: 'See the MacBook Pro, iPhone 7, and AirPods. Explore iPad, Apple Watch, iOS, watchOS, macOS, and more. Visit the site to learn, buy, and get support.',
        },
      },
    },
    b: ...snapshot (optional)
  },
}
```

### Postback webhook receives

Plugins have 60 minutes to post results. Ideally the result is posted as soon as possible.

#### In-progress

This feature is not available yet. All in-progress will be communicated to the user as an unknown length of time.

In-progress updates let the user know that the plugin is processing. Send the following to update progress.

```js
{
  progress: {
    comparison: 10, // percent complete
    a: 80,
    b: 100,
  },
}
```

#### Complete

Developers can send whatever data they want to have accessable to their report in the comparison object.

```js
{
  comparison: {
    diff: 28,
    summary: '{{a}} is longer than {{b}}',
  },
  snapshots: {
    a: {
      length: 148
    },
    b: {
      length: 120
    },
  },
}
```
