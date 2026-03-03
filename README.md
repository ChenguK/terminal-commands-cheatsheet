# Terminal Commands

`cd` = change directory

`cd ..` = change directory to parent directory of the current directory

`cd /` = The root (top-level) directory on the harddrive

`cd ~` = change directory to the logged in user's home directory

`pwd` = print working directory - "ie- where am I right now?"

`ls` = list contents of directory

`ls -a` = list all including hidden contents of directory

`mkdir` = make a directory

`touch` = make a file

`mv` = move directory or rename directory

`cp` = copy directory or file

`rm` = remove/delete file

`rm -r` = remove directory

`clear` = moves window to a clean slate (though the history is available if you scroll up)

`tree` = displays a graphical representation of a directory and its nested directories


####Using Tab Auto-Completion

Change to the home directory

Now let's change to our newly created `drawers` directory, however, only type `cd d`,
then press `tab` which will auto-complete directory name(s)

You can cycle between matching directory names by continuing to press `tab`

###Deleting Files

Using the `*` wildcard character, it's possible to delete and move multiple files. For example, typing `*.socks` would match all files with an extension of `.socks` ...

`rm -r ~/drawers/pjs` would delete the directory `pjs` inside of the `drawers` directory