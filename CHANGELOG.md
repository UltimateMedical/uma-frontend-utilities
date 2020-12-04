# Changelog

## v1.1.0 <- v1.0.0
No breaking changes.

This update adds a new feature and does not touch older files. We should deprecate the old version of these utilities when we have time. For now, I left them as is.

Anyhoo, this minor update adds a v2 of the QueryStringParser. The v2 version can save specified query string params to local storage.

Additionally, it adds the FormParamBuilder. The FormParamBuilder allows you to access your resolved params without doing much coding at all. By "resolved," I mean the value is either the default, passed in the query string, or in local storage. FormParamBuilder takes care of this logic for you, so you don't have to do it.

## v1.0.0 <- v0.4.1
`@ultimatemedical/uma-utils` is now a github package! I figured it's best to keep our packages in the same place, and since `@ultimatemedical/acorn` needed to be switched to GitHub Packages for Gatsby Cloud, I figured this was a necessary step. Switching to GitHub Packages required a name change, so that's why this is a major update.