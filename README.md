# Movie Title Generator

## *Movielens Data + Markov Chains = Title Generator*

### *Goal*

My goal was to create a movie title generator that could generate unique movie title's based on a given genre that seemed highly probably when compared to actual move titles.


### *Game Plan*

My plan was to use a mathematical structure called Markov chain's to model the statistical likelihood of a word in a title being followed by some other word in a title. Then, I could use that statistical information to generate new titles by choosing the first word (at random) and then choosing subsequent words with a frequency proportional to how those words, and how they are arranged in regards to the original title. This will then give me a string of text that will not only be unique, but will also share stylistic properties when compared to the original text.


### *Why?*

I'm interested in learning more about Markov Chains & Hidden Markov Models because I would like to explore the following concepts.
 - Automatic Speech Recognition
 - Navigation Prediction & Transitions.

Which use and/or implement Markov Models one way or another

### *Datasets*

The following main data sources were used for this project.

- [MovieLens - 9,000 Titles](http://grouplens.org/datasets/movielens/)
- [MovieLens Large - 27,000 Titles](http://grouplens.org/datasets/movielens/20m/)
- [MovieLens Super - 45,000 Titles](http://grouplens.org/datasets/movielens/latest/)

#### *MovieLens*

The MovieLens ~ [Movie Title's/Genre] data is provided by GroupLens Research as datasets ranging in size from 9,000 to 45,000. I've decided to use the latest dataset of 45,000 movie titles.

### *Benchmark*

##### *Dataset ~ 9,000*

```

# Hardware ~ (HP Spectre x360, 2.7 GHz i7-7500U CPU):
$ time node generate.js
real    0m0.395s
user    0m0.000s
sys     0m0.030s

```

##### *Dataset ~ 27,000*

```

# Hardware ~ (HP Spectre x360, 2.7 GHz i7-7500U CPU):
$ time node generate.js
real    0m0.485s
user    0m0.010s
sys     0m0.030s

```

##### *Dataset ~ 45,000*

```

# Hardware ~ (HP Spectre x360, 2.7 GHz i7-7500U CPU):
$ time node generate.js
real    0m0.602s
user    0m0.000s
sys     0m0.030s

```

### *Result*

My results suggest that generate.js was able to effectively model and observe the created state using Markov Chains, which then made it possible for the system to get the probability of each word and it's successor fairly easily. Thus making sentence/title generation from large datasets accurate and efficient.

```javascript

Example:
generate('Sci-Fi'); // => 'Interstella 23: Attack of the flying Apes'
generate('Horror'); // => 'The last dance with the devil'
generate('Adventure'); // => 'The chronicles of space bots'
generate('Romance'); // => 'my last kiss, my last puppy, my last everything'

```

### *Next Steps*

This preliminary system can be developed further in a number of ways.

- Use system to generate songs, poetry, recipe's, & screen play's using various datasets.
