# django-reactjs-example


### Installation
1. [Django framework](https://www.djangoproject.com/)
2. [Nodejs, Npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)


### Create simple Django REST Project
1. Create project by command: `django-admin startproject django_projects`
2. Create new app by command: `python manage.py startapp polls`

3. Create model Polls by update file `polls/models.py`
```bash
    from django.db import models
    
    class Polls(models.Model):
        name = models.CharField(max_length=200)
        version = models.IntegerField(default=0)
        description = models.TextField(default='')
        owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE, default=1)
        created_at = models.DateTimeField(auto_now_add=True)
    
        class Meta:
            ordering = ('created_at',)
            unique_together = ('name',)
            index_together = ('name',)
``` 

4. Create file `polls/serializers.py`
```bash
    from rest_framework import serializers
    from .models import Polls
    
    
    class PollsSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Polls
            fields = ('id', 'name', 'version', 'owner','created_at')

```

5. Update `polls/views.py`
```bash
    from django.shortcuts import render
    from .models import Polls
    from .serializers import PollsSerializer
    from rest_framework import generics
    from rest_framework.permissions import IsAuthenticatedOrReadOnly
    
    
    class PollList(generics.ListCreateAPIView):
        queryset = Polls.objects.all()
        serializer_class = PollsSerializer
        permission_classes = (IsAuthenticatedOrReadOnly,)
    
    
    class PollDetail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Polls.objects.all()
        serializer_class = PollsSerializer
```

6. Create `polls/templates/polls/index.html`
```bash
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Django React Example</title>
        </head>
        <body>
            <div id="app" class="app">
                <h2>Hello world.</h2>
            </div>
        </body>
    </html>
```

7. Create file `polls/urls.py`
```bash
    from django.urls import path
    
    from .views import PollList, PollDetail
    
    urlpatterns = [
        path('', PollList.as_view(), name='index'),
        path('<int:pk>/', PollDetail.as_view(), name='detail')
    ]
```

8. Update file `django_react_project/urls.py`
```bash
    from django.contrib import admin
    from django.urls import path, include
    from rest_framework.authtoken.views import obtain_auth_token
    from . import views
    
    urlpatterns = [
        path('', views.index, name='index'),
        path('admin/', admin.site.urls),
        path('polls/', include('polls.urls')),
        path('api-auth/', include('rest_framework.urls')),
        path('api-token-auth/', obtain_auth_token)
    ]
```

9. Update file `django_react_project/views.py`
```bash
    from django.shortcuts import render
    
    def index(request):
        return render(request, 'polls/index.html', context={})
```

10. Update settings `django_react_project/settings.py`
```bash
    INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework.authtoken',
    'polls'
    ]
    
    REST_FRAMEWORK = {
            'DEFAULT_AUTHENTICATION_CLASSES': (
                'rest_framework.authentication.BasicAuthentication',
                'rest_framework.authentication.SessionAuthentication',
                'rest_framework.authentication.TokenAuthentication'
            )
        }
```

11. Make migrate `python manage.py makemigrations`, `python manage.py migrate` and run project: `python manage.py runserver`
    
    Go to url `localhost:8000` and check screen.
![Django Main](/django_react_project/static/images/django_main.png)
    
    Go to url `localhost:8000/polls` and check screen.
![Django Rest Project](/django_react_project/static/images/django_polls_api.png)


### Setup Npm
1. Create `package.json` by running this command: `npm init -y`
2. Install dependencies by command: 
```bash
    npm i webpack webpack-cli babel-core babel-loader babel-preset-env babel-preset-react babel-plugin-transform-class-properties react react-dom prop-types --save-dev
```
3. Create file `.babelrc` at base directory
```bash
    {
        "presets": [
            "env", "react"
        ],
        "plugins": [
            "transform-class-properties"
        ]
    }
```

4. Create file `webpack.config.js`
```bash
      module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    };
```

### Using ReactJs at this project
1. Create file `polls/static/reactjs/index.js`
```bash
    import React from "react";
    import ReactDOM from "react-dom";
    import PollForm from "./forms/poll_form";
    
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                'items': []
            };
        }
    
        componentDidMount() {
            fetch('polls/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({'items': result})
                }
            )
        }
    
        render(){
            const items = this.state.items;
            return (
                <div>
                    <h2>Hello world. This is ReactJs</h2>
                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Version</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {items.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.version}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PollForm />
                </div>
            )
        }
    }
    
    ReactDOM.render(<App />,  document.getElementById('app'))
```

2. Create form file `polls/static/reactjs/forms/poll_form.js`
```bash
    import React from "react"

    class PollForm extends React.Component {
    
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                name: '',
                version: ''
            }
        }
    
        handleChange(e) {
            this.setState({[e.target.name]: e.target.value});
        }
    
        handleSubmit(e) {
            e.preventDefault();
            const polls = {'name': this.state.name,
                           'version': this.state.version};
            const datas = {
                method: 'post',
                body: JSON.stringify(polls),
                headers: new Headers({"Content-Type": "application/json",
                                     "Authorization": "Token 93ae3c513f41d5292c8a81237527c51071ae33b5"})
            };
            fetch('polls/', datas)
                .then(response => response.json())
                .then(response => {
                        console.log(response);
                     }
                )
        }
    
        render(){
            const {name, version} = this.state
            return (
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input className="input" type="text" name="name" value={name}
                               onChange={this.handleChange} required />
                    </div>
                    <div className="field">
                        <label>Version</label>
                        <input className="input" type="number" name="version" version={version}
                               onChange={this.handleChange} required />
                    </div>
                    <button type="submit" className="button">Save</button>
                </form>
            );
        }
    }
    export default PollForm;
```

3. Update file `package.json`
```bash
    "scripts": {
    ...
    "build": "webpack --mode=production ./polls/static/reactjs/index.js --output ./polls/static/polls/js/main.js"
  },
```

4. Building `polls/js/main.js` by running this command: `npm run build`

5. Now, we will update `templates/polls/index.html`
```bash
    {% load static %}
    <script src="{% static 'polls/js/main.js' %}"></script>
```

6. Restart project `python manage.py runserver` and check url `localhost:8000`
![Django rest react](/django_react_project/static/images/django_rest_react.png)









