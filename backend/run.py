"""run file importing the mentor app module"""

from mentorapp import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
