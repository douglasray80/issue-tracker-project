## **FreeCodeCamp**- Information Security and Quality Assurance

Project Issue Tracker

1. SET NODE_ENV to `test` without quotes and set DB to your mongo connection string in .env file
2. Complete the project in `routes/api.js` or by creating a handler/controller
3. You will add any security features to `server.js`
4. You will create all of the functional tests in `tests/2_functional-tests.js`

User Stories

<li>Prevent cross site scripting(XSS attack).</li>
<li>I can <b>POST</b> `/api/issues/{projectname}` with form data containing required <em>issue_title</em>, <em>issue_text</em>, <em>created_by</em>, and optional <em>assigned_to</em> and <em>status_text</em>.</li>
<li>The object saved (and returned) will include all of those fields (blank for optional no input) and also include <em>created_on</em>(date/time), <em>updated_on</em>(date/time), <em>open</em>(boolean, true for open, false for closed), and <em>_id</em>.</li>
<li>I can <b>PUT</b> <code>/api/issues/{projectname}</code> with a <em>_id</em> and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update <em>updated_on</em>. If no fields are sent return 'no updated field sent'.</li>
<li>I can <b>DELETE</b> <code>/api/issues/{projectname}</code> with a <em>_id</em> to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.</li>
<li>I can <b>GET</b> <code>/api/issues/{projectname}</code> for an array of all issues on that specific project with all the information for each issue as was returned when posted.</li>
<li>I can filter my get request by also passing along any field and value in the query(ie. <code>/api/issues/{project}?open=false</code>). I can pass along as many fields/values as I want.</li>
<li>All 11 functional tests are complete and passing.</li>
</ol>
<br>
<h3>Example get usage:</h3>
<code>/api/issues/{project}</code><br>
<code>/api/issues/{project}?open=true&amp;assigned_to=Joe</code><br>
<h3>Example return:</h3>
```
[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]
```

[EXAMPLE: Go to <em>/apitest/</em> project issues]('/apitest/')
