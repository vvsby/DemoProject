                     Angular agGrid Component


Goal

The purpose of this exercise is to check the candidate’s ability to create a standalone Angular application with 3rd party library integration and customise the functionality through the 3rd party library API.

Acceptance criteria

We expect the standalone Angular application with the requested features will be developed and shared through Github. The final result will be analysed with the following criteria in mind:


Architecture and design. We expect the candidate to make the decision on the necessary components architecture which follows Angular best practice recommendations.

Code. Clean and readable code style is important part of this exercise. Usage of TSlint (or similar) tool for code styling is expected.

Unit testing. The candidate should provide unit tests where appropriate.

Attention to the details. We expect that all features listed in the description section are delivered and any side effects are thought through and tested.  

Creativity and Research ability. You are expected in relatively short period of time to research and use 3rd party API to customise the standard functionality in most efficient way. Nice styling is not required, but will be a bonus.


Assignment

You will be creating Angular application with a single component, which will use 3rd Party library called agGrid (https://www.ag-grid.com).

There is an instruction on agGrid website on how to create Angular application using Angular CLI (https://www.ag-grid.com/ag-grid-angular-angularcli).

Use the link provided below to fetch the data from the open API to populate the grid:

https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john






Tasks

1. The data from the API should be rendered in the grid. The following fields should be presented in the data grid:

"thumbnails" (default) as an image (no Column name)
"publishedAt" as "Published on"
"title" as "Video Title"
"description" as "Description"

**** “Video Title” column content should be the link to the video on YouTube. For this purpose, please use this URL - https://www.youtube.com/watch?v=XXXX, where XXXX is "videoId" string, which is supplied in the data for each record.


2. Create a Toolbar (as a part of agGrid component) with 3 controls:
 - Button to toggle Selection mode in agGrid
 - Total count of records in the grid
 - Selected records count


When user switch on Selection, the additional column with checkbox is shown on the grid for each record to enable user to select/unselect the records:

 

 and 

 

 
3. Create a custom “Select/Unselect All” (please note that there is a standard checkbox header) check box header component. It is a standalone component, which has agGrid specific interface and should be included in agGRid column definition. Please refer agGrid API documentation on their website on how this task should be done.

This custom header component should communicate with agGrid component and when user check (or uncheck) the box, all records in agGrid should be selected or unselected respectively.

You should also implement the communication from agGrid to “Select/Unselect All”  header component. For example, if user select All records through the header check box and then unselect one or more records from the grid, the check box should unchecked, like shown below:

 

and 

 

The count of selected records should be reflected in the Toolbar (please see point 2 above)


 
4. Customise the Context menu for “Video Title” field (this is link to the YouTube video). Standard context menu is shown below:

 

You will need to add the “Open in new tab” item to this menu to enable the user to open video link (please see task 1) in new browser tab.
