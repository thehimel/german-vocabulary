def join_field_values(field, attribute, method_name):
    def decorator(cls):
        def method_wrapper(self, obj):
            return ", ".join([getattr(item, attribute) for item in getattr(obj, field).all()])

        method_wrapper.short_description = field.capitalize().replace("_", " ")
        setattr(cls, method_name, method_wrapper)
        return cls

    return decorator
