//TODO make a proper logo & use instead of 'script' icon

function onGmailMessageOpen(e) {
  // Activate temporary Gmail scopes, in this case to allow
  // the add-on to read message metadata and content.
  var accessToken = e.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  // Read message metadata and content. This requires the Gmail scope
  // https://www.googleapis.com/auth/gmail.addons.current.message.readonly.
  var messageId = e.gmail.messageId;
  var message = GmailApp.getMessageById(messageId);

  // Setting the access token with a gmail.addons.current.message.readonly
  // scope also allows read access to the other messages in the thread.
  var thread = message.getThread();
  var threadMessages = thread.getMessages();

  // Can only split thread if at least 2 messages
  if (threadMessages.length < 2)
    return [];

  // Construct the card
  const input = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)
    .setFieldName("messages")
    .setTitle("Messages in new thread");
  for (const m of threadMessages) {
    if (!m.isInTrash())
      input.addItem(m.getFrom() + " at " + formatDate(m.getDate()), m.getId(), m.getId() == messageId); //TODO select the selected item by default (currently doesn't work, not sure why)
  }

  const defaultSubject = thread.getFirstMessageSubject() + ' (Split)';
  var section = CardService.newCardSection();
  section.addWidget(CardService.newTextInput()
      .setTitle("Subject of new thread")
      .setFieldName("subject")
      .setValue(defaultSubject))
    .addWidget(input)
    .addWidget(CardService.newButtonSet()
      .addButton(CardService.newTextButton()
        .setText('Split thread')
        .setOnClickAction(CardService.newAction()
          .setFunctionName('onSplitThreadButtonClick'))));

  //TODO add button to auto-split all messages (if 3 messages or more)

  var builder = CardService.newCardBuilder()
    .addSection(section);
  return builder.build();
}

function onSplitThreadButtonClick(e) {
  var accessToken = e.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken); //TODO is this required?

  var subject = e.formInput.subject;
  if (subject.length == 0)
    return notify("Please enter a subject");

  var messages = e.formInputs.messages;
  var text;
  if (messages.length == 0)
    return notify("Please select at least one message");
  else if (messages.length == 1)
    text = "Split 1 message into a new thread";
  else
    text = "Split " + messages.length + " messages into a new thread";

  splitThread(subject, messages);

  var actionResponse = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation()
      .updateCard(CardService.newCardBuilder()
        .addSection(CardService.newCardSection()
          .addWidget(CardService.newTextParagraph()
            .setText(text)))
        .build())); //TODO add buttons on confirmation message to open new thread / refresh this thread
  return actionResponse.build();
}

function notify(text) {
  var notification = CardService.newNotification()
    .setText(text);
  var actionResponse = CardService.newActionResponseBuilder()
    .setNotification(notification);
  return actionResponse.build();
}

function splitThread(subject, messageIds) {
  const recipient = Session.getActiveUser().getEmail();
  for (const id of messageIds) {
    const m = GmailApp.getMessageById(id);
    var replyTo = m.getReplyTo();
    if (!replyTo || replyTo == '')
      replyTo = m.getFrom();
    GmailApp.sendEmail(recipient, subject + m.getReplyTo(), m.getPlainBody(), {
      htmlBody: m.getBody(),
      attachments: m.getAttachments(),
      name: m.getFrom(),
      replyTo: replyTo
    });
    //TODO find new email & add the same inbox/folders/labels as existing message
    m.moveToTrash();
  }
}

function formatDate(dateString) {
  var d = new Date(dateString);
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "dd MMM YYYY, HH:mm");
}