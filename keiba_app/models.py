from django.db import models


class ScoreHistory(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    score = models.IntegerField()

    valid_count = models.IntegerField()

    percentage = models.FloatField()

    rank = models.CharField(max_length=10)

    message = models.TextField()

    def __str__(self):
        return f"{self.rank} - {self.percentage}%"