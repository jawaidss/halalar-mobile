# halalar-mobile

## Requirements

* [git](http://www.git-scm.com/)
* [Steroids](https://academy.appgyver.com/installwizard/)

## Installation

```bash
git clone git@github.com:jawaidss/halalar-mobile.git
```

## Usage

```bash
cd /path/to/halalar-mobile/halalar
steroids connect --no-qrcode
s
```

## Testing

```bash
steroids test karma --simulator
```

## Deploying

* `/path/to/halalar-mobile/halalar/www/javascripts/application.js`
 * Update `VERSION`.
* `/path/to/halalar-mobile/halalar/www/config.xml`, `/path/to/halalar-mobile/halalar/www/config.android.xml`, `/path/to/halalar-mobile/halalar/www/config.ios.xml`
 * Update `version`.

```bash
git commit -m "Release version 1.0.0" -a
git push
git tag 1.0.0
git push --tags
steroids deploy
```

* [Appgyver Cloud Services](https://build.appgyver.com/applications)
* [iTunes Connect](https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/wo/34.0)
* [Google Play Developer Console](https://play.google.com/apps/publish)