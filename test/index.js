var regexDataExtractor = require('..');
var chai = require('chai');
var should = chai.should();

describe('mrspider-regex-data-extractor', function () {

    var validPage;
    var validSpider;
    var validNext;
    var validOptions;

    beforeEach(function () {
        validOptions = {};
        validPage = {
            content: `<html><head>
  <title>Stuart Frankel's very small web site</title>
<meta name="verify-v1" content="1vLCRPR1SHmiCICnhWfD7jtpOOSHe79iILqzDkGBUg0=">
</head>
<body style="color: rgb(0, 0, 0); background-color: rgb(245, 204, 176); background-image: url(./images/gecback2.jpg);" alink="#db70db" link="red" vlink="#2f2f4f">
<br>
<center>
<table border="8">
  <tbody>
    <tr>
      <td bgcolor="#f5ccb0">
      <h1>My Small-But-Intense Home Page!</h1>
      </td>
    </tr>
  </tbody>
</table>
</center>
<br>
<center>
<p>If you came here looking for information on human trafficking in East Africa, you actually want to go <a href="http://dustyfeetonline.com">here</a>, since I don't know anything about it.</p>
<p></p>
<font size="5">Welcome to my Small-But-Intense Home Page! There's not
much here yet, but at least I'm avoiding those obnoxious <a href="notuncnj.html" target="_top">under construction</a> tags, so if
there's a
visible link it should give you something. </font></center>
<center>
<p></p>
<font size="4">24 August 2006. About The Barney Affair: This is my
little corner of the web, and the bullies can't have it. There's
nothing more to it than that. There's a NYTimes article about it <a href="http://www.nytimes.com/2006/08/28/technology/28link.html?scp=6&amp;sq=%22stuart%20frankel%22&amp;st=cse">here</a>.<br>
</font></center>
<center>
<table cellpadding="12" cellspacing="12" width="85%">
<!--<tr><td valign=top><font size="5"><a href="rescent.html">Upgrades</a></font></td></tr>-->
  <tbody>
    <tr>
      <td valign="top"> <font size="5"><a href="diss.html" target="_top">Dissertation</a></font></td>
      <td valign="top"> <font size="4">The whole thing is here for
downloading; also the
abstract for reading online, if you're in a hurry. I'm accepting bids
for the movie rights.</font></td>
    </tr>
    <tr>
      <td halign="right" valign="top"><font size="5"><a href="mykeyboardbaby1.html"> How to build a clavichord</a></font><br>
      <font size="4"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </font></td>
      <td valign="top"><font size="4">The story of my clavichord, made
by Owen Daly, after an 18th-century Portuguese model.</font></td>
    </tr>
    <tr>
      <td halign="right" valign="top"><font size="5"><a href="./evil/evil.html">Evil</a></font></td>
      <td valign="top"><font size="4">Bad odor</font></td>
    </tr>
    <tr>
      <td halign="right" valign="top"><font size="5"><a href="./pangan/index.html">Warung Seniman</a> </font></td>
      <td valign="top"><font size="4">Javanese recipes by a Javanese
musician. Recipes by Wakidi Dwijamartono; text by K. Emerson.</font></td>
    </tr>
    <tr>
      <td halign="right" valign="top"><font size="5"><a href="./santanyi_registration.html">Spanish organ</a> </font></td>
      <td valign="top"><font size="4">Some practical information about
registration in Spanish Baroque Organ music.</font></td>
    </tr>
  </tbody>
</table>
<br>
<br>
<a href="mailto:gecko@dustyfeet.com">e-mail me if you want</a></center>
<br>
<br>


</body></html>`
        };
        validSpider = {};
        validNext = function () {
        }
    });

    it('should call next', function (done) {
        var extractor = regexDataExtractor(validOptions);
        extractor(validPage, validSpider, done);
    });

    it('should create a data property on the page', function () {
        var extractor = regexDataExtractor(validOptions);
        extractor(validPage, validSpider, validNext);
        should.exist(validPage.data);
    });

    it('should not overwrite a data property on the page', function () {
        validPage.data = {msg: 'hi'};
        var extractor = regexDataExtractor(validOptions);
        extractor(validPage, validSpider, validNext);
        validPage.data.msg.should.equal('hi');
    });

    it('should get that email off the page and into an email property on page.data', function () {
        var extractor = regexDataExtractor({
            email: /mailto:([^"]+)/
        });
        extractor(validPage, validSpider, validNext);
        validPage.data.email.should.equal('gecko@dustyfeet.com');
    });

    it('should not throw an error if the page content has not been set', function() {
        var extractor = regexDataExtractor({
            email: /mailto:([^"]+)/
        });
        delete validPage.content;
        extractor(validPage, validSpider, validNext);
    });


});
