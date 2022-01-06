# Privacy Policy

## Summary
All data is processed entirely on Google’s servers, within the Google Apps Scripts platform. Email data is stored in Gmail directly, and only temporarily in memory within the Google Apps Script system while the threads are being split. This is private to your Google account, and ThreadSplitter (and its developers) have absolutely no access to this, so your data stays private (in line with your Google account’s data retention policy).

## Plain english

The data which is used by ThreadSplitter is listed, and described below.
* Gmail addon - ThreadSplitter is an add-on which can be used in the sidebar of your Gmail interface. It only accesses the message contents of the currently open email thread.
* Gmail read/send/delete - ThreadSplitter requires access to your emails so that it can forward any selected messages to you with a different subject line, which makes them appear as a different thread in Gmail. Only messages in the current thread will ever be read by ThreadSplitter, and the data is not stored after the forwarded email is sent. Only messages which have been successfully forwarded to you as a separate thread will ever be deleted, and those deleted messages will still appear in your Gmail "Bin" folder until it is cleared.
* User email address - ThreadSplitter is provided your Google account's email address for one use only, so that the messages you are splitting out of a thread can be forwarded to you and only you. By using the user's account email address, ThreadSplitter ensures that your email data is only ever forwarded to you and is not accessible by any other party.

## Technical details

The scopes which are required by ThreadSplitter are listed, and described below.
* [https://www.googleapis.com/auth/gmail.addons.execute](https://www.googleapis.com/auth/gmail.addons.execute) - This allows the ThreadSplitter add-on to run in the sidebar of Gmail.
* [https://mail.google.com/](https://mail.google.com/) - This technically allows the ThreadSplitter add-on to read, send and delete all of your emails, but in practise only the messages in the current Gmail thread are read when you open the add-on. Any messages you select in the add-on will be forwarded to you to create a separate thread, and then the messages which were forwarded will be deleted from the current thread.
* [https://www.googleapis.com/auth/userinfo.email](https://www.googleapis.com/auth/userinfo.email) - This provides the ThreadSplitter add-on with the email address of your Google account. This is the email address which your emails will get forwarded to when split, as described above.

Back to [home page](index.md).