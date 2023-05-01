# Hearth
This app is intended to learn Dialetical Behaviour Therapy (DBT). Created and developed by Michael Deng. 

## To Add
1. 😀 DONE - Update the sign up page to display if an email already exists (proper error handling)
2. 😀 DONE - Prompt the user if the login credentials entered don't match, or do not fit the proper format
3. Modal to notify user the meditation is over, also user tracking for how many times they've done it
4. Visual cues for audio volume
5. Collections -> when clicking on a collection item it should expand if clicked on the entire body, not just the icon
6. Add transitions for the chapters to better indicate a change in state, easier to follow
7. Add a 'Resume where last left off' option to take them back to the correct unit (can be based on current user current_progress metric)
8. BCrypt for personal information
9. Capitalize first letter of given_name if they give a non capitalized name
10. Add visual cues to show how the user can 'save'
11. Add card to the intro, I missed adding 'List' as an card type

### Bugs
1. 😀 DONE - Clicking on the initial 'Remember Me' checkbox doesn't accurately reflect state. Flagging as a controlled component error
2. Deleting a saved page from collections doesn't reflect until the route is refreshed (redoing the GET request)
3. The timer doesn't reflect a change in the input time IF it has already begun
4. Moving from slide to slide should collapse technique cards
5. The final cards should restrict movement, prevent scrolling? Bug with some slides extending far down in height which can still be seen