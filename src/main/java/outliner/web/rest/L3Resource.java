package outliner.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import outliner.domain.L3;
import outliner.repository.L3Repository;
import outliner.repository.search.L3SearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;

/**
 * REST controller for managing L3.
 */
@RestController
@RequestMapping("/api")
public class L3Resource {


    private final Logger log = LoggerFactory.getLogger(L3Resource.class);

    private static final String ENTITY_NAME = "l3";

    private final L3Repository l3Repository;

    private final L3SearchRepository l3SearchRepository;

    public L3Resource(L3Repository l3Repository, L3SearchRepository l3SearchRepository) {
        this.l3Repository = l3Repository;
        this.l3SearchRepository = l3SearchRepository;
    }

    /**
     * POST  /l-3-s : Create a new l3.
     *
     * @param l3 the l3 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l3, or with status 400 (Bad Request) if the l3 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-3-s")
    @Timed
    public ResponseEntity<L3> createL3(@Valid @RequestBody L3 l3) throws URISyntaxException {
        log.debug("REST request to save L3 : {}", l3);
        if (l3.getId() != null) {
            throw new BadRequestAlertException("A new l3 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L3 result = l3Repository.saveAndFlush(l3);
        //EntityManager flush should be called here
        l3SearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-3-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-3-s : Updates an existing l3.
     *
     * @param l3 the l3 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l3,
     * or with status 400 (Bad Request) if the l3 is not valid,
     * or with status 500 (Internal Server Error) if the l3 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-3-s")
    @Timed
    public ResponseEntity<L3> updateL3(@Valid @RequestBody L3 l3) throws URISyntaxException {
        log.debug("REST request to update L3 : {}", l3);
        if (l3.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L3 result = l3Repository.saveAndFlush(l3);
        //EntityManager flush should be called here
        l3SearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l3.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-3-s : get all the l3S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l3S in body
     */
    @GetMapping("/l-3-s")
    @Timed
    public List<L3> getAllL3S() {
        log.debug("REST request to get all L3S");
        
        return (List<L3>) l3Repository.findAll();
    }

    /**
     * GET  /l-3-s/:id : get the "id" l3.
     *
     * @param id the id of the l3 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l3, or with status 404 (Not Found)
     */
    @GetMapping("/l-3-s/{id}")
    @Timed
    public ResponseEntity<L3> getL3(@PathVariable Long id) {
        log.debug("REST request to get L3 : {}", id);
        Optional<L3> l3 = l3Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(l3);
    }

    /**
     * DELETE  /l-3-s/:id : delete the "id" l3.
     *
     * @param id the id of the l3 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-3-s/{id}")
    @Timed
    public ResponseEntity<Void> deleteL3(@PathVariable Long id) {
        log.debug("REST request to delete L3 : {}", id);

        l3Repository.deleteById(id);
        l3SearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-3-s?query=:query : search for the l3 corresponding
     * to the query.
     *
     * @param query the query of the l3 search
     * @return the result of the search
     */
    @GetMapping("/_search/l-3-s")
    @Timed
    public List<L3> searchL3S(@RequestParam String query) {
        log.debug("REST request to search L3S for query {}", query);
        return StreamSupport
            .stream(l3SearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
