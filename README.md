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
22. Mobile Site header needs to disappear on scrolldown
23. Pagination for beginner tutorial (maybe)
24. Font resizing option
25. Mobile slide scrolling buttons block the text
26. Modify flow of content so that finishing the unit gives the option to go to next lesson
27. Also modify the button text to better reflect the state of the unit (complete or in progress)
28. Overhaul tutorial to take place when the piece of relevant content appears, not all at once


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
11. Lists can repeat a suggestion, need to track which have already appeared
12. Visual bugs tied to the sizing of the landing page image as well as the main fireplace visual
13. Cannot alter the sound of meditation or the initial start up matchsticks on mobile, different method of adjustment
14. Bot Nav adjusts state too much in response to scrolling, add minimum move
15. Unclear how to navigate from Feedback/Meditation page? Improve tutorial

### API Calls
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

<!-- 
  //austin bray
  //margaret (Aundreya's wife)
  //justin hugh //also recommended the bot nav be more accessible
  //james suresh -->


  <!-- to add: 
  'Continue Journey' CTA
  Create new settings/cogwheel option that contains anchor links as well as toggle options -->