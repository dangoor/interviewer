# Interviewer

Experimental tool for creating and giving live coding technical interviews.

Note: *this really isn't ready for prime time yet!*

## Trying it out

Run the following:

```
npm install
typings install
```

If you don't already have webpack-dev-server:

```
npm install -g webpack-dev-server
```

Then, run:

```
webpack-dev-server
```

And open your browser to [localhost:8080](http://localhost:8080)

## Using Interviewer

You break divide the window up into panes by dragging the triangle from the corners
of the window (or the corners of panes to break the panes down further). You can also
merge panes together by dragging from the triangle onto another pane.

To update previews, press cmd-S in an editor.

Press cmd-B to access the control buttons.

Use the save/restore state button to get access to a JSON representation of the
environment. This is how you permanently save your work and share it with others.
Paste in previously saved state and click the Set State button to reload from
a previous session (or get set up for an interview). Clicking the Current State
button will repopulate the dialog with the current state of the window.

To begin a live interview, click the TogetherJS button in the Control Buttons.
TogetherJS' UI will appear. Copy the URL given and provide that to the interviewee.
 