from app.models import db, User, Post, Comment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    nightWing = User(
        username='NightWing', email='DickGrayson@gmail.com', password='password', profileImage='https://cdn.mos.cms.futurecdn.net/qPoCGaaUx72ekhXhRRRVum.jpg')
    starFire = User(
        username='StarFire', email='Koriandr@gmail.com', password='password', profileImage='https://i.ytimg.com/vi/17Oyy_eiS_A/maxresdefault.jpg')

    missMartian = User(
        username='MissMartian', email='MgannMorzz@gmail.com', password='password', profileImage='https://static.wikia.nocookie.net/youngjustice/images/b/bd/Miss_Martian_in_2010.png/revision/latest?cb=20190805110806')

    beastBoy = User(
        username='BeastBoy', email='MarkLogan@gmail.com', password='password', profileImage='https://64.media.tumblr.com/d39f76cf2591c2451f05ff19561ec802/tumblr_onw160uKlk1rk9c31o1_1280.jpg')

    db.session.add(demo)
    db.session.add(nightWing)
    db.session.add(starFire)
    db.session.add(missMartian)
    db.session.add(beastBoy)
    

    post1 = Post(
     description="You'll never know if you can fly unless you take the risk of falling.",
     user=nightWing,
    )

    post2 = Post(
        description="kickback at Titans Tower",
        img="https://i.redd.it/qk4hvytbwms81.jpg",
        user=nightWing
    )

    post3 = Post(
        description="Y'know, a lot of the time it's like you Batguys want me to hold onto the past because you can't get over it. Understand— I have. I have a new life now. One I like — one that fulfills me. It's not the same as the one I had before, but it's good. Maybe even better.",
        user=nightWing
    )

    post4 = Post(
        description="It is enjoyable to laugh at someone else's misfortune.",
        user=starFire
    )

    post5 = Post(
        description="Training Day",
        img="https://pbs.twimg.com/media/EoqFrayXcAEUjeP?format=jpg&name=large",
        user=starFire
    )

    post6 = Post(
        description="Feeling confident in my skin",
        img="https://static.wikia.nocookie.net/youngjustice/images/7/71/White_Martian.png/revision/latest?cb=20120427112146",
        user=missMartian
    )

    post7 = Post(
        description="Hello, Megan! I totally forgot I had trainging today!",
        user=missMartian
    )

    post8 = Post(
        description="Its movie night",
        img="https://preview.redd.it/mvzzoolnmn881.jpg?auto=webp&s=97f9661c50d633f50fc03a436e5b1aa94ee3b42a",
        user=beastBoy
    )

    post9 = Post(
        description="Bro, cats are they worst. If you're gonna be an animal be a dog, dogs are rad.",
        user=beastBoy
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)



    comment1 = Comment(
        description = 'Or you could just... fly',
        user = starFire,
        post = post1
    )

    comment2 = Comment(
        description = 'I lost my phone can you call it?',
        user = beastBoy,
        post = post2
    )

    comment3 = Comment(
        description = 'I don"t get it',
        user = missMartian,
        post = post4
    )

    comment4 = Comment(
        description = 'Can I copy your style sometime',
        user = beastBoy,
        post = post6
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)





    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
