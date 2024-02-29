from allauth.account.views import SignupView
from applications.users.forms import UserSignupForm


class UserSignupView(SignupView):
    template_name = "account/signup.html"
    form_class = UserSignupForm
    redirect_field_name = "next"

    # This is mandatory and is copy-pasted.
    def get_context_data(self, **kwargs):
        ret = super(UserSignupView, self).get_context_data(**kwargs)
        ret.update(self.kwargs)
        return ret
