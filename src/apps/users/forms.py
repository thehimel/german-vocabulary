from django import forms
from apps.users.models import User
from allauth.account.forms import SignupForm
from apps.users.constants import NAME_MAX_LENGTH


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "gender", "profile_picture"]


class UserSignupForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super(UserSignupForm, self).__init__(*args, **kwargs)
        self.fields["password1"].help_text = (
            "Your password must contain at least 8 characters and can’t be entirely numeric."
        )

    first_name = forms.CharField(
        max_length=NAME_MAX_LENGTH, widget=forms.TextInput(attrs={"placeholder": "First name"})
    )
    last_name = forms.CharField(max_length=NAME_MAX_LENGTH, widget=forms.TextInput(attrs={"placeholder": "Last name"}))
    field_order = ["first_name", "last_name", "email", "username", "password1", "password2"]

    def save(self, request):
        user = super(UserSignupForm, self).save(request)
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        user.save()
        return user
