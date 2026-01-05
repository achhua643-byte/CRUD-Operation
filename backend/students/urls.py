from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_list),
    path('create/', views.student_create),
    path('update/<int:pk>/',views.student_update),
    path('delete/<int:pk>/', views.student_delete),
]