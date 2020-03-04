---
title: "The **.rw** route format"
linktitle: "The RW route"
weight: 3
---

The RW route format is functionally equivalent to the CSV route format, but differs in syntax, structure and choice of words. Given that the RW route format is not frequently used any longer, it is recommended to use the CSV route format instead.

There is no full documentation on RW routes, only the quick reference which illustrates the available commands and syntax:

➟ [Quick reference...]({{< ref "/routes/rw_quick/_index.md" >}}) 

Please refer to the documentation for CSV routes for the behavior of the various commands, but mind that choice of words and syntax differ in CSV. You can also compare against the [quick reference for CSV routes]({{< ref "/routes/csv_quick/_index.md" >}}) to work out the differences between the formats.

------

**Behavioral differences between CSV and RW**

In RW, comments starting with a semicolon can only be used at the end of a line inside the [Railway] section. Outside of the [Railway] section, comments must appear on their own line.

In RW, every piece of text before the first [Section] is considered part of the route description, which is Route.Comment in CSV.

In RW, the default @Height at the beginning of the route is 0.3 meters, while in CSV, the default Track.Height is 0.0 meters. Additionally, every value passed to @Height is added an additional 0.3 meters in RW.

In RW, the second argument to @Form can take special values: -9 is the same as L, 9 is the same as R, and 9X references rail 9. In CSV, -9 is invalid and 9 references rail 9.
