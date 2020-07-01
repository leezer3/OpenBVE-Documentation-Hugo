---
title: "**.rw** 路線格式"
linktitle: "RW 路線"
weight: 3
---

RW路線格式嘅功能同CSV差唔多, 但使用唔同嘅句法, 結構同指令名稱。因RW路線格式已經唔再常用, 建議使用CSV路線格式。

There is no full documentation on RW routes, only the quick reference which illustrates the available commands and syntax:

➟ [Quick reference...]({{< ref "/routes/rw_quick/_index.md" >}}) 

Please refer to the documentation for CSV routes for the behavior of the various commands, but mind that choice of words and syntax differ in CSV. You can also compare against the [quick reference for CSV routes]({{< ref "/routes/csv_quick/_index.md" >}}) to work out the differences between the formats.

------

**RW同CSV唔同嘅特性**

In RW, comments starting with a semicolon can only be used at the end of a line inside the [Railway] section. Outside of the [Railway] section, comments must appear on their own line.

In RW, every piece of text before the first [Section] is considered part of the route description, which is Route.Comment in CSV.

In RW, the default @Height at the beginning of the route is 0.3 meters, while in CSV, the default Track.Height is 0.0 meters. Additionally, every value passed to @Height is added an additional 0.3 meters in RW.

In RW, the second argument to @Form can take special values: -9 is the same as L, 9 is the same as R, and 9X references rail 9. In CSV, -9 is invalid and 9 references rail 9.
