from django.db import models


class About(models.Model):
    '''Model for the About paragraphs, listed in the /about page of the TEDxNTUA
     2019 website.
    '''

    title = models.CharField(max_length=200)
    text = models.TextField()




    def __str__(self):
        '''Objects of the About class are represented as strings by
        their title property
        '''
        return self.title
