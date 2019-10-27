# WebApp-master

Name: Alanas Jakonis

Student No : 20076515

Webapp CA1 I have created a back end app which store the user with Name, Gender, Address and user points as one model.
For second model i have created reviews where reviews get stored with upvotes on the review.From each models I am able create,read,update,delte.
For this project I have also implemented heroku to host my app online instead of it running it local host. 
I have also implemented fuzzy search incase user of the apps would like to pull infomation without knowing exact keywords.

The app has:

6 get: 

app.get('/reviews/votes', reviews.findTotalVotes);

app.get('/reviews', reviews.findAll);

app.get('/reviews/:id', reviews.findOne);

app.get('/users', users.findAll);

app.get('/users/votes', users.findTotalVotes);

app.get('/users/:id', users.findOne);

3 posts:

app.post('/reviews',reviews.addReview);

app.post('/users',users.addUser);

app.post('/users/search', users.findFuzzy);

2 puts:

app.put('/reviews/:id/vote', reviews.incrementUpvotes);

app.put('/users/:id/vote', users.incrementUppoints);

2 deletes:

app.delete('/reviews/:id', reviews.deleteReview);

app.delete('/users/:id', users.deleteUser);
