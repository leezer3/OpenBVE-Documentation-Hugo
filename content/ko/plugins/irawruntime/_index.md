---
title: "Train plugin API (IRawRuntime)"
hidden: true
---

This is the documentation for train plugins accepting raw input. In order to create a train plugin, implement the IRawRuntime interface from the OpenBveApi.Runtime namespace. In the following, you will find a description of how this interface works.

{{% warning-nontitle %}}

This interface is currently experimental / unstable, and subject to breaking changes.

{{% /warning-nontitle %}}

------

## ■ 목차

{{% contents %}}

- [1. Overview](#overview)
- [2. Function calls](#functions)
- [3. Additional ElapseData Members](#elapse)

{{% /contents %}}

## <a name="overview"></a>■ Overview

The IRawRuntime plugin interface is a separate interface, which extends the IRuntime interface to allow train plugins to accept raw keyboard / touch input from the simulation window.

This for instance may be useful if you wish to implement a plugin which accepts text input or large numbers of additional custom keys.

Please see the [IRuntime interface]({{< ref "/plugins/iruntime/_index.md" >}}) documentation also.

## <a name="functions"></a>■ Function Calls

**void RawKeyDown(Key key)**

This function is called when a key is pressed.

Arguments:  

{{% table-nonheader %}}

| Key | key  | The key that was pressed. |
| --- | ---- | ------------------------- |
|     |      |                           |

{{% /table-nonheader %}}

**void RawKeyUp(Key key)**

This function is called when a key is released.

Arguments:  

{{% table-nonheader %}}

| Key | key  | The key that was released. |
| --- | ---- | -------------------------- |
|     |      |                            |

{{% /table-nonheader %}}

**void TouchEvent(int groupIndex, int commandIndex)**

This function is called when a touch event occurs.

Arguments:  

{{% table-nonheader %}}

| int | groupIndex    | The touch group which was activated.              |
| --- | ------------- | ------------------------------------------------- |
| int | commandIndex  | The associated command index for the touch group. |
|     |               |                                                   |

{{% /table-nonheader %}}

## <a name="elapse"></a>■ Additional ElapseData Members

IRawInput also adds the following useful **ElapseData** members:

Arguments:  

{{% table-nonheader %}}

| BlockingInput | boolean  | Whether the plugin is blocking input- This should be set when taking custom keyboard input to avoid triggering controls. |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
|               |          |                                                                                                                          |

{{% /table-nonheader %}}