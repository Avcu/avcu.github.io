---
title:  "Building GitHub Pages using Docker"
categories:
  - Programming
tags:
  - Github
  - Docker
---

This website is built using Jekyll with Minimal Mistakes theme and hosted on
GitHub Pages. To run the website locally, one needs Ruby, RubyGems and Jekyll.
Ruby is a programming language, RubyGems is a package manager for Ruby just like
pip for Python and finally Jekyll is a gem that converts markdowns to html codes. 
Here, we will see how we can use docker to handle all these in an easy and clear
way.

## Step 1: Create a container with Ruby

Once a Github Page Theme is forked and cloned locally, we need to create a
container with Ruby. Create a file called `Dockerfile` with the following content

```
FROM ruby:2.5

WORKDIR /usr/src/app

# we put README.md as placeholder, because Docker cannot create empty container
COPY README.md ./

#create volume for later mounting of your local directory
VOLUME /usr/src/app
```
And then, build a container

```
docker build -t my-ruby-env .
```

## Step 2: Generate Gemfile.lock

Generate a `Gemfile.lock` for minimal-mistakes theme

```
docker run --volume="$PWD:/usr/src/app" -it my-ruby-env bundle install
```

## Step 3: Create a container for the website to run locally

Make sure that `port` and `host` are defined in the `_config.yml`, and modify the
`Dockerfile` as follows

```
FROM ruby:2.5

RUN bundle config --global frozen 1

WORKDIR /usr/src/app

# prepare to install ruby packages into container
COPY Gemfile Gemfile.lock minimal-mistakes-jekyll.gemspec ./

RUN bundle install

VOLUME /usr/src/app

EXPOSE 4000

CMD ["jekyll", "serve"]
```

Finally, run the following commands to build the container and run it.

```
docker build -t minimal-mistakes .
docker run --volume="$PWD:/usr/src/app" -p 4000:4000 -t minimal-mistakes
```

## Step 4: Publish it on GitHub

Now, we can build the site in production mode and upload the `_site` to Github.
```
docker run --rm -it --volume="$PWD:/srv/jekyll" --volume="$PWD:/usr/src/app" --env JEKYLL_ENV=production jekyll/jekyll:3.8 jekyll build
```
