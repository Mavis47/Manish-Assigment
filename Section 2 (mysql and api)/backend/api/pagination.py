from rest_framework.pagination import PageNumberPagination

# Custom pagination class to handle ?page=1&limit=10 style queries

class CustomPagination(PageNumberPagination):
    page_size_query_param = "limit"   # limit=10
    page_query_param = "page"         # page=1
    page_size = 10                    # default
    max_page_size = 100
