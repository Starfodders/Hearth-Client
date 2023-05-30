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
21. Website ARIA completion
22. Mobile Site header needs to disappear on scrolldown
23. Pagination for beginner tutorial (maybe)


### Bugs
1. 😀 DONE - Clicking on the initial 'Remember Me' checkbox doesn't accurately reflect state. Flagging as a controlled component error
2. 😀 DONE - Deleting a saved page from collections doesn't reflect until the route is refreshed (redoing the GET request)
3. 😀 DONE - The timer doesn't reflect a change in the input time IF it has already begun
4. 😀 DONE - Moving from slide to slide should collapse technique cards
5. 😀 DONE - The final cards should restrict movement, prevent scrolling? Bug with some slides extending far down in height which can still be seen
6. 😀 DONE - Remove transcript toggle for techniques that do not have this feature within collections
7. BotNav is clipping through content, not accessible at most times and can interfere with reading if accidentally hover
8. 😀 DONE - Logout menu is hard-coded, doesn't align with actual name length
9. 😀 DONE - Fix meditate timer when it resets, it subtracts time
10. 😀 DONE - Feedback page is no longer working
11. Lists can repeat a suggestion, need to track which have already appeared

<!-- 
  //austin bray
  //margaret (Aundreya's wife)
  //justin hugh //also recommended the bot nav be more accessible
  //james suresh -->


  <!-- to add: 
  'Continue Journey' CTA
  Create new settings/cogwheel option that contains anchor links as well as toggle options -->