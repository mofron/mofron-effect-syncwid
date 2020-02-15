# mofron-effect-syncwid
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

synchronize width of target component and width of effect component


# Install
```
npm install mofron mofron-effect-syncwid
```

# Sample
```html
<require>
    <tag load="mofron-comp-frame">Frame</tag>
    <tag load="mofron-comp-button">Button</tag>
    <tag load="mofron-effect-syncwid">SyncWid</tag>
</require>

<Frame name=frame width=2.5rem>
    <Button effect=SyncWid:(@frame,-0.02rem)>SyncWid effect</Button>
</Frame>
```

# Parameter

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| ◯  | targetComp | Component | target component |
| | | | undefined: call as getter |
| ◯  | offset | string(size) | offset value (default is '0rem') |
| | | | undefined: call as getter |

