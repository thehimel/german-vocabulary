from drf_yasg import openapi
from rest_framework import serializers
from rest_framework.fields import empty


def serializer_to_manual_parameters(serializer_class):
    parameters = []

    for field_name, field in serializer_class().fields.items():
        parameter_type = openapi.TYPE_STRING

        if isinstance(field, serializers.IntegerField):
            parameter_type = openapi.TYPE_INTEGER
        elif isinstance(field, serializers.FloatField):
            parameter_type = openapi.TYPE_NUMBER
        elif isinstance(field, serializers.BooleanField):
            parameter_type = openapi.TYPE_BOOLEAN

        default = field.default if field.default is not empty else None

        parameters.append(
            openapi.Parameter(
                field_name, openapi.IN_QUERY, type=parameter_type, required=field.required, default=default
            )
        )
    return parameters
