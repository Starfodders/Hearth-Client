# Hearth
This app is intended to learn Dialetical Behaviour Therapy (DBT). Created and developed by Michael Deng. 

## To Add
1. 😀 DONE - Update the sign up page to display if an email already exists (proper error handling)
2. 😀 DONE - Prompt the user if the login credentials entered don't match, or do not fit the proper format
3. 😀 DONE - Modal to notify user the meditation is over
4. 😀 DONE - Visual cues for audio volume
5. 😀 DONE - Collections -> when clicking on a collection item it should expand if clicked on the entire body, not just the icon
6. 😀 DONE - Add transitions for the chapters to better indicate a change in state, easier to follow
7. 😀 DONE - Add a 'Resume where last left off' option to take them back to the correct unit (can be based on current user current_progress metric)
8. 😀 DONE - BCrypt for personal information
9. 😀 DONE - Capitalize first letter of given_name if they give a non capitalized name
10. 😀 DONE - Add visual cues to show how the user can 'save'
11. 😀 DONE - Add card to the intro, I missed adding 'List' as an card type
12. 😀 DONE - Add form for users to submit feedback on improvements
13. 😀 DONE - Add additional graphics for users when going through techniques
14. Add animation to background waves
15. 😀 DONE - Website responsive design (Tablet)
16. 😀 DONE - Website responsive design (Mobile)
17. 😀 DONE - Add place to download specific forms for exercises
18. 😀 DONE - Add better help tooling for new users
19. Add stat tracking for user progress under 'collections'
20. Re: stat tracking, create separate user profile to handle this
21. 😀 DONE - Website ARIA completion
22. 😀 DONE - Mobile Site header needs to disappear on scrolldown
23. Font resizing option
24. 😀 DONE - Mobile slide scrolling buttons block the text
25. 😀 DONE - Modify flow of content so that finishing the unit gives the option to go to next lesson
26. 😀 DONE - Also modify the button text to better reflect the state of the unit (complete or in progress)
27. 😀 DONE - Overhaul tutorial to take place when the piece of relevant content appears, not all at once
28. Infographic for what each unit covers
29. 😀 DONE - Alter seed data to have text decorations for significant words
30. May need to redo guest log in to be more apparent/immediate for people who want to get into the App instantly
31. 😀 DONE - Rework Collections to have sub-category for each chapter for ease of access


### Bugs
1. 😀 DONE - Clicking on the initial 'Remember Me' checkbox doesn't accurately reflect state. Flagging as a controlled component error
2. 😀 DONE - Deleting a saved page from collections doesn't reflect until the route is refreshed (redoing the GET request)
3. 😀 DONE - The timer doesn't reflect a change in the input time IF it has already begun
4. 😀 DONE - Moving from slide to slide should collapse technique cards
5. 😀 DONE - The final cards should restrict movement, prevent scrolling? Bug with some slides extending far down in height which can still be seen
6. 😀 DONE - Remove transcript toggle for techniques that do not have this feature within collections
7. 😀 DONE - BotNav is clipping through content, not accessible at most times and can interfere with reading if accidentally hover
8. 😀 DONE - Logout menu is hard-coded, doesn't align with actual name length
9. 😀 DONE - Fix meditate timer when it resets, it subtracts time
10. 😀 DONE - Feedback page is no longer working
11. 😀 DONE - Lists can repeat a suggestion, need to track which have already appeared
12. Visual bugs tied to the sizing of the landing page image as well as the main fireplace visual
13. Cannot alter the sound of meditation or the initial start up matchsticks on mobile, different method of adjustment
14. 😉 DISABLED - Bot Nav adjusts state too much in response to scrolling, add minimum move
15. 😀 DONE - Unclear how to navigate from Feedback/Meditation page? Improve tutorial
16. 😀 DONE - Radical Acceptance Worksheet (Advanced TD II) links to the entire workbook, not the single sheet

### API Endpoints
1. (POST) Login
2. (POST) Guest Login
3. (POST) Sign Up
4. (POST) Guest Sign Up - same route as regular sign up, different headers
5. (GET) CHeck if user is new (GET)
6. (GET) All Units for specific navigation (GET)
7. (GET) Chapters filtered based on user progress
8. (GET) User Current Progress through Hearth
9. (GET) Sections filtered based on user progress
10. (GET) Units filtered based on user progress
11. (GET) Retrieve specific unit
12. (GET) Retrieve User's Collection Data
13. (GET) Specific unit closing slide
14. (PATCH) Finishing the unit and updating DB
15. (POST) Save a specific slide
16. (DELETE) Delete a specific slide
17. (PATCH) Confirm or Skip going through the tutorial 
18. (POST) Submit feedback form
19. (GET) Retrieve Transcript Data & Audio

<!-- 
  //austin bray
  //margaret (Aundreya's wife)
  //justin hugh //also recommended the bot nav be more accessible
  //james suresh -->


 <!-- New Tutorial
 - Detect if user is new, each tutorial tooltip needs its own state to determine if it is 'completed'. I can just save to localStorage, easier
 - Home page needs tutorials for bottom nav, return to homepage, log out, additional navigation options bar
 - Chapters page needs a tutorial for chapter progression, also what the new Go To Next Button does
 - Unit slides need tutorials for navigation, saving. Also on additional resources when needed -->

 <!-- newUser? Then toggle flag and run through tooltip component? Click anywhere on screen and it moves onto next. Add this onclick to the portal's parent since it'll bubble up anyways

 Using a separate component for each 'area', have this component render child Portal Modals and once they finish, save to LocalStorage and keep them closed. 

 HomePage -> localStorage no item || newUser -> TutorialModals On -> createPortals on body -> TutorialModals off -> localStorage createItem

 * May have to patchNew API call later, when they have successfully reached techniques to see all content
 * or have seperate localStorage tracking for main user and guest user -->