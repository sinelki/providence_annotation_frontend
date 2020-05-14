# Providence Annotation Frontend

This repo is one of several projects related to [CCLYC](https://github.com/sinelki/cclyc.git).
It is the frontend used to display Annotation Tasks for
[Cues to Comparison Class in Child-directed Language](http://library.mit.edu/F/PQKXE2YAGSC2MEUE92G1NESLJHRCHALE3ABDPS867K4HJBR97F-00503?func=file&amp=&amp=&amp=&amp=&amp=&amp=&file%5Fname=find-b&local%5Fbase=THESES2).

## Prerequisites<a href=”prerequisites”></a>
If you haven’t already done so, follow the setup instructions for
[Providence Annotation Backend](https://github.com/sinelki/providence_annotation_backend#readme)

## Setup<a href="setup"></a>
Obtain a copy of `browser_detect.js` from
[Detect.js](https://raw.githubusercontent.com/darcyclarke/Detect.js/28bbfb16f0266bd2b74aca6b3803d40130b6bf20/detect.min.js)

`client.js` assumes that the ports used by the backend service are 60984 (http) and 60985 (https),
but these can be easily modified if using different ports.
