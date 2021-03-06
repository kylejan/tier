function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

var team_name = $('#team-name').text()

function post_msg() {
    var info = new Object();
    info.team = team_name;
    info.content = $('#msg-content').val();

    $.ajax({
            url: '/team/news',
            type: 'POST',
            dataType: 'json',
            data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
        })
        .done(function(resp) {
            console.log("success");
            $('#new-success-btn').fadeIn('400', function() {
                $('#new-success-btn').delay(1000).fadeOut('400');
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

};

function join_team_accept(btn) {
     var info = new Object();
     info.user_name = btn.prev().prev().text();
     info.team_name = team_name;
     info.action = 'accept';

     $.ajax({
             url: '/team/join',
             type: 'POST',
             dataType: 'json',
             data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
         })
         .done(function(resp) {
            console.log("success");
            if (resp['status'] == 'inserts') {
                btn.text('COMPLETE');
            }
         })
         .fail(function() {
            console.log("error");
         })
         .always(function() {
            console.log("complete");
         });
}

function meeting_create() {
    var info = new Object();
    info.type = "create";
    info.team = team_name;
    info.content = $('#meeting-content').val();
    info.time = $('#meeting-time').val();

    $.ajax({
            url: '/team/meetings',
            type: 'POST',
            dataType: 'json',
            data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
        })
        .done(function() {
            console.log("success");
            $('#meeting-success-btn').fadeIn('400', function() {
                $('#meeting-success-btn').delay(1000).fadeOut('400');
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

function create_assignment() {
    var info = new Object();
    info.team = team_name;
    info.assignee = $('#assign-target-member').text();
    info.content = $('#assign-content').val();
    info.deadline = $('#assign-deadline').val();

    $.ajax({
            url: '/team/assignments',
            type: 'POST',
            dataType: 'json',
            data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
        })
        .done(function() {
            console.log("success");
            $('#assign-success-btn').fadeIn('400', function() {
                $('#assign-success-btn').delay(1000).fadeOut('400');
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

};

function load_meeting_timeline() {
    var info = new Object();
    info.type = "query";
    info.user = $('#nav_user').text();

    $.ajax({
            url: '/team/meetings',
            type: 'POST',
            dataType: 'json',
            data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
        })
        .done(function(resp) {
            console.log("success");

            $.each(resp['meetings'], function(index, meeting) {

                var time_icon = $('<i/>', {
                    class: "glyphicon glyphicon-time"
                });
                var time_small_wrap = $('<small></small>', {
                    class: "text-muted"
                });
                var time_p_wrap = $('<p/>');

                time_small_wrap.append(time_icon);
                time_small_wrap.append(meeting['meeting_time']);
                time_p_wrap.append(time_small_wrap);

                var timeline_team_text = $('<h4/>', {
                    class: 'timeline-title',
                    text: meeting['team']
                });
                var timeline_heading = $('<div/>', {
                    class: 'timeline-heading'
                });

                timeline_heading.append(timeline_team_text);
                timeline_heading.append(time_p_wrap);

                var timeline_body_text = $('<p></p>', {
                    text: meeting['content']
                });
                var timeline_body = $('<div/>', {
                    class: 'timeline-body'
                });
                timeline_body.append(timeline_body_text);

                var timeline_panel = $('<div/>', {
                    class: 'timeline-panel'
                });
                timeline_panel.append(timeline_heading);
                timeline_panel.append(timeline_body);

                var timeline_badge = $('<div/>', {
                    class: 'timeline-badge warning'
                });
                var timeline_badge_icon = $('<i/>', {
                    class: 'glyphicon glyphicon-credit-card'
                });
                timeline_badge.append(timeline_badge_icon);

                var li_timeline;
                if (index % 2 == 0)
                    li_timeline = $('<li/>');
                else
                    li_timeline = $('<li/>', {
                        class: "timeline-inverted"
                    });

                li_timeline.append(timeline_badge);
                li_timeline.append(timeline_panel);

                $('#meeting-timeline-board').append(li_timeline);
            });

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

function load_deadline_timeline() {
    var info = new Object();
    info.user = $('#nav_user').text();

    $.ajax({
            url: '/user/deadlines',
            type: 'POST',
            dataType: 'json',
            data: {
                _xsrf: getCookie("_xsrf"),
                _body: JSON.stringify(info)
            },
        })
        .done(function(resp) {
            console.log("success");

            $.each(resp['deadlines'], function(index, deadline) {

                var time_icon = $('<i/>', {
                    class: "glyphicon glyphicon-time"
                });
                var time_small_wrap = $('<small></small>', {
                    class: "text-muted"
                });
                var time_p_wrap = $('<p/>');

                time_small_wrap.append(time_icon);
                time_small_wrap.append(deadline['deadline']);
                time_p_wrap.append(time_small_wrap);

                var timeline_team_text = $('<h4/>', {
                    class: 'timeline-title',
                    text: deadline['team']
                });
                var timeline_heading = $('<div/>', {
                    class: 'timeline-heading'
                });

                timeline_heading.append(timeline_team_text);
                timeline_heading.append(time_p_wrap);

                var timeline_body_text = $('<p></p>', {
                    text: deadline['content']
                });
                var timeline_body = $('<div/>', {
                    class: 'timeline-body'
                });
                timeline_body.append(timeline_body_text);

                var timeline_panel = $('<div/>', {
                    class: 'timeline-panel'
                });
                timeline_panel.append(timeline_heading);
                timeline_panel.append(timeline_body);

                var timeline_badge = $('<div/>', {
                    class: 'timeline-badge warning'
                });
                var timeline_badge_icon = $('<i/>', {
                    class: 'glyphicon glyphicon-credit-card'
                });
                timeline_badge.append(timeline_badge_icon);

                var li_timeline;
                if (index % 2 == 0)
                    li_timeline = $('<li/>');
                else
                    li_timeline = $('<li/>', {
                        class: "timeline-inverted"
                    });

                li_timeline.append(timeline_badge);
                li_timeline.append(timeline_panel);

                $('#deadline-timeline-board').append(li_timeline);
            });

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

$(document).ready(function() {

    load_meeting_timeline();
    load_deadline_timeline();

    $('.datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });

    // msg post
    $('.post-team-choice').click(function(event) {
        $('#post-target-team').text($(this).text());
    });

    $('#msg-post-clear-btn').click(function(event) {
        $('#post-target-team').text('NONE');
        $('#msg-content').val('');
    });

    $('#doc-post-clear-btn').click(function(event) {
        $('#doc-name-create').val('');
    });

    $('#doc-post-confirm-btn').click(function(event) {
        create_doc();
    });

    $('#msg-post-confirm-btn').click(function(event) {
        post_msg();
    });

    // meeting create
    $('.meeting-team-choice').click(function(event) {
        $('#meeting-target-team').text($(this).text());
    });

    $('#meeting-create-clear-btn').click(function(event) {
        $('#meeting-target-team').text('NONE');
        $('#meeting-content').val('');
        $('#meeting-time').val('');
    });

    $('#meeting-create-confirm-btn').click(function(event) {
        meeting_create();
    });

    // assignment create
    $('.assign-team-choice').click(function(event) {
        $('#assign-target-team').text($(this).text());
        load_team_members($(this).text());
        $('#assign-member-dropdown').empty();
        $('#assign-target-member').text('NONE');
    });

    $('#assign-member-dropdown').on('click', '.assign-member-choice', function(event) {
        event.preventDefault();
        $('#assign-target-member').text($(this).text());
    });

    $('#assign-create-clear-btn').click(function(event) {
        $('#assign-target-team').text('NONE');
        $('#assign-target-member').text('NONE');
        $('#assign-content').val('');
        $('#assign-deadline').val('');
    });

    $('#assign-create-confirm-btn').click(function(event) {
        create_assignment();
    });

    $('.join-accept-btn').click(function(event) {
        join_team_accept($(this));
    });

    $('#team-tab li:eq(0) a').tab('show');
});