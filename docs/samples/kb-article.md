# How to import clients from a spreadsheet

!!! info "Sample document"
    Fictional product. Shows how I write task-based knowledge base articles for end users.

You can add many clients at once by importing a CSV file instead of creating each client manually.

**Who can do this:** Agency admins and users with the *Import data* permission.

## Before you start

- Save your spreadsheet as a **CSV (comma-separated) file**.
- Make sure the first row contains column headings.
- Each client needs at least a **first name**, **last name** and either an **email** or **phone number**.

!!! tip
    Download the [sample CSV template](#) to see the expected format.

## Import your clients

1. Go to **Clients** and select **Import**.
2. Select **Upload file** and choose your CSV file.
3. Match each column in your file to a field in Acme Agency Manager. Columns with the same name are matched automatically.
4. Choose what to do with duplicates:
    - **Skip** – keep the existing client and ignore the row
    - **Update** – overwrite the existing client with data from the file
5. Select **Start import**.

You'll get an email when the import finishes. Large files (over 10,000 rows) can take up to 15 minutes.

## Check the results

Go to **Clients > Import history** to see how many clients were added, updated or skipped. Select **Download error file** to see rows that couldn't be imported and why.

## Common errors

| Error | How to fix it |
|---|---|
| *Missing required field* | Add a first name, last name and email or phone to the row |
| *Invalid email format* | Check for spaces or missing "@" in the email address |
| *File type not supported* | Save the file as CSV, not XLSX |

## Related articles

- How to export your client list
- How to merge duplicate clients
