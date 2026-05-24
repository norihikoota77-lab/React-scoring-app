from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # TOP
    path("", views.index, name="index"),
    path("api/history/", views.history_api, name="history_api"),
    path(
    "api/history/delete/<int:history_id>/",
    views.delete_history_api
    ),
    path(
        "api/history/export/",
        views.export_history_csv
    ),

    # Excelダウンロード
    path(
        "reports/<str:file_name>/",
        views.download_report,
        name="download_report"
    ),

    # React API
    path(
        "api/score/",
        views.score_api,
        name="score_api"
    ),
]

# 開発環境用
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )